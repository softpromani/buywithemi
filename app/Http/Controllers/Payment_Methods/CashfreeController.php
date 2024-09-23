<?php

namespace App\Http\Controllers\Payment_Methods;

use App\Models\Order;
use App\Models\PaymentRequest;
use App\Models\User;
use App\Traits\Processor;
use Carbon\Carbon;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use juspaypay\Api\Api;
use Brian2694\Toastr\Facades\Toastr;
use Exception;
use Illuminate\Support\Facades\Log;
use Seshac\Shiprocket\Shiprocket;

class CashfreeController extends Controller
{
    use Processor;

    private PaymentRequest $payment;
    private $user;

    public function __construct(PaymentRequest $payment, User $user)
    {
        $config = $this->payment_config('jus_pay', 'payment_config');
        $juspay = false;
        if (!is_null($config) && $config->mode == 'live') {
            $juspay = json_decode($config->live_values);
        } elseif (!is_null($config) && $config->mode == 'test') {
            $juspay = json_decode($config->test_values);
        }

        if ($juspay) {
            $config = array(
                'api_key' => $juspay->api_key,
                'api_secret' => $juspay->api_secret
            );
            Config::set('juspay_config', $config);
        }

        $this->payment = $payment;
        $this->user = $user;
    }

    public function index(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'payment_id' => 'required|uuid'
        ]);

        if ($validator->fails()) {
            return response()->json($this->response_formatter(GATEWAYS_DEFAULT_400, null, $this->error_processor($validator)), 400);
        }

        $data = $this->payment::where(['id' => $request['payment_id']])->where(['is_paid' => 0])->first();
        Session::put('payment_id', $request['payment_id']);
        // dd($data);
        if (!isset($data)) {
            return response()->json($this->response_formatter(GATEWAYS_DEFAULT_204), 200);
        }
        $payer = json_decode($data['payer_information']);
        $user = User::where('email', $payer->email)->first();
        $customer_id = $this->createJuspayCustomer($user);

        // Log::info('fgnn - '.json_encode($data));

        $api_key = config('juspay_config.api_key');
        $authorization = "Basic " . base64_encode($api_key . ":");
        $merchant_id = config('juspay_config.api_secret');
        try{

            $juspay_data =
            [
                "order_id" => $data->order_id,
                "amount" => round($data->payment_amount, 2),
                "customer_id" => 'CUST-'.$user->id,
                "customer_email" => $user->email ?? 'softpromani@gmail.com',
                "customer_phone" => $user->phone,
                "payment_page_client_id" => "fastemi",
                "action" => "paymentPage",
                "return_url" => route('jus-pay.payment'),
                "description" => "Complete your payment",
                "first_name" => $user->f_name,
                "last_name" => $user->l_name
            ];
            // Log::info('payment-lock'.json_encode($juspay_data));

            // Check the payment method type and set the appropriate payment_filter
            if (in_array(strtolower($data->payment_method_type), ['upi', 'card', 'netbanking', 'wallet'])) {
                $juspay_data['payment_filter'] = [
                    'allowDefaultOptions' => false,
                    'options' => [
                        [
                            'paymentMethodType' => strtoupper($data->payment_method_type),
                            'enable' => true,
                            // 'cardFilters'=> [
                            //     [
                            //         'cardTypes'=>['CREDIT'],
                            //         'enable'=>true
                            //     ],
                            //     [
                            //         'cardBanks'=>['BAJAJ'],
                            //         'enable'=>true
                            //     ]
                            // ]
                        ]
                    ]

                ];
            } elseif (strtolower($data->payment_method_type) === 'emi') {
                $juspay_data['payment_filter'] = [
                    'allowDefaultOptions' => true,
                    'options' => [],
                    'emiOptions' => [
                        'showOnlyEmi' => true,
                    ]
                ];
            } elseif (strtolower($data->payment_method_type) == 'bajaj_emi') {
                // $juspay_data['payment_filter'] = [
                //     'allowDefaultOptions' => false,
                //     'options' => [
                //         [
                //             'paymentMethodType' => 'CONSUMER_FINANCE',
                //             'paymentMethods' => [
                //                 'MOBIKWIKZIP',
                //                 'MONEY_VIEW_LSP'
                //             ]
                //         ]
                //     ],
                //     'emiOptions' => [
                //         'lowCostEmi' => [
                //             'debit' => [
                //                 'enable' => true
                //             ],
                //             'credit' => [
                //                 'enable' => true,
                //                 'filters' => [
                //                     [
                //                         'issuerFilter' => [
                //                             'issuers' => ['JP_BAJAJ'],
                //                             'enable' => true
                //                         ],
                //                         'paymentMethodType' => 'CARD',
                //                         'paymentMethod' => 'CARD',
                //                         'enable' => true
                //                     ]
                //                 ]
                //             ]
                //         ],
                //         'noCostEmi' => [
                //             'debit' => [
                //                 'enable' => true
                //             ],
                //             'credit' => [
                //                 'enable' => true,
                //                 'filters' => [
                //                     [
                //                         'issuerFilter' => [
                //                             'issuers' => ['JP_BAJAJ'],
                //                             'enable' => true
                //                         ],
                //                         'paymentMethodType' => 'CARD',
                //                         'paymentMethod' => 'CARD',
                //                         'enable' => true
                //                     ]
                //                 ]
                //             ],
                //             'enable' => true
                //         ],
                //         'standardEmi' => [
                //             'debit' => [
                //                 'enable' => true
                //             ],
                //             'credit' => [
                //                 'enable' => true,
                //                 'filters' => [
                //                     [
                //                         'issuerFilter' => [
                //                             'issuers' => ['JP_BAJAJ'],
                //                             'enable' => true
                //                         ],
                //                         'paymentMethodType' => 'CARD',
                //                         'paymentMethod' => 'CARD',
                //                         'enable' => true
                //                     ]
                //                 ]
                //             ],
                //             'enable' => true
                //         ]
                //     ]
                // ];

                $juspay_data['payment_filter'] = [
                    'allowDefaultOptions' => false,
                    'options' => [
                        [
                            'paymentMethodType' => 'CARD',
                            'enable' => true,
                            'cardFilters'=> [
                                [
                                    'cardBrands'=>['BAJAJ'],
                                    'enable'=>true
                                ]
                            ]
                        ]
                    ]

                ];

            } elseif (in_array(strtolower($data->payment_method_type), ['hdfc', 'icici', 'idfc_first', 'kotak_bank', 'home_credit'])) {
                $juspay_data['payment_filter'] = [
                    'allowDefaultOptions' => true,
                    'options' => [],
                    'emiOptions' => [
                        'standardEmi' => [
                            'enable' => true
                        ],
                        'lowCostEmi' => [
                            'enable' => true
                        ],
                        'noCostEmi' => [
                            'enable' => false
                        ]
                    ]
                ];

            } elseif (strtolower($data->payment_method_type) === 'zest_money') {
                $juspay_data['payment_filter'] = [
                    'allowDefaultOptions' => false,
                    'options' => [
                        [
                            'paymentMethodType' => 'CONSUMER_FINANCE',
                            'enable' => true,
                            'paymentMethods' => ['ZESTMONEY']
                        ]
                    ]

                ];
            }

            $response = Http::withHeaders([
                'Authorization' => $authorization,
                'x-merchantid' => $merchant_id,
                'Content-Type' => 'application/json',
            ])->post('https://api.juspay.in/session',
                $juspay_data
            );

            if ($response->failed()) {
                Log::error('Juspay API Error', [
                    'status' => $response->status(),
                    'reason' => $response->reason(),
                    'body' => $response->body(),
                ]);
                echo 'Bad Request: ' . $response->body();
            }

            if ($response->successful()) {
                $json_data = json_decode($response->body());
                // Log::info('juspay -'.json_encode($response->body()));
                return redirect($json_data->payment_links->web);
            } else {
                Toastr::error(translate($response->reason()).'!');
                return redirect(url('/'));
            }
        }
        catch(Exception $ex){
            Log::info('juspay catch exception ---'.json_encode($ex->getMessage()));
        }

    }

    public function payment(Request $request): JsonResponse|Redirector|RedirectResponse|Application
    {
        $input = $request->all();
        // Log::info($input);
        $payment_id = Session::get('payment_id');
        // dd($payment_id);
        if (!empty($input['status_id']) && isset($payment_id) && $input['status_id'] == '21' ) {

            $this->payment::where(['id' => $payment_id])->update([
                'payment_method' => 'juspay_pay',
                'is_paid' => 1,
                'transaction_id' => $input['order_id'],
            ]);
            $data = $this->payment::where(['id' => $payment_id])->first();

            if (isset($data) && function_exists($data->success_hook)) {
                call_user_func($data->success_hook, $data);
            }

            Session::forget('payment_id');

            //Shiprocket API Call
            $shiprocket = $this->dispatchOrder($data);

            return $this->payment_response($data, 'success');
        }
        $payment_data = $this->payment::where(['id' => $payment_id])->first();;
        if (isset($payment_data) && function_exists($payment_data->failure_hook)) {
            call_user_func($payment_data->failure_hook, $payment_data);
        }
        Session::forget('payment_id');
        return $this->payment_response($payment_data, 'fail');
    }

    public function dispatchOrder($request){

        $order = Order::with(['customer','billingAddress','shippingAddress'])->where('transaction_ref', $request->order_id)->first();
        // Log::info('order'.json_encode($order));
        $user = $order->customer;
        $billing = $order->billingAddress;
        $shipping = $order->shippingAddress;

        $orderDetails = [
            'order_id' => $request->order_id,
            'order_date' => Carbon::now(),
            'pickup_location' => 'primary',
            // 'courier_id' => $request->courier,
            'billing_customer_name' => isset($user->f_name) ? $user->f_name : 'FastEMI',
            'billing_last_name' => isset($user->l_name) ? $user->l_name : 'User',
            'billing_city' => $billing->city,
            'billing_pincode' => $billing->zip,
            'billing_state' => 'State',
            'billing_country' => $billing->country,
            'billing_email' => isset($billing->email) ? $billing->email : 'fastemiindia@gmail.com',
            'billing_phone' => $billing->phone,
            'billing_address' => $billing->address,
            'shipping_is_billing' => true,
            'shipping_customer_name' => isset($user->f_name) ? $user->f_name : 'FastEMI',
            'shipping_last_name' => isset($user->l_name) ? $user->l_name : 'User',
            'shipping_city' => $shipping->city,
            'shipping_pincode' => $shipping->zip,
            'shipping_state' => 'State',
            'shipping_country' => $shipping->country,
            'shipping_email' =>  isset($shipping->email) ? $shipping->email : 'fastemiindia@gmail.com',
            'shipping_phone' => $shipping->phone,
            "payment_method" => "Prepaid",
            "shipping_charges" => $order->shipping_cost,
            "giftwrap_charges" => 0,
            "transaction_charges" => 0,
            "total_discount" => 0,
            "sub_total" => $request->payment_amount,
        ];
        $order_details = [];
        $order_dimenions = [
            'length' => '200',
            'breadth' => '200',
            'height' => '200',
            'weight' => '2',
        ];
        $counter = 0;
        foreach($order->details as $key=>$detail)
        {
            $order_details[] = [
                "name" => $detail->product->name,
                "sku" => $detail->product->code,
                "units" => $detail->qty,
                "selling_price" => $detail->price,
                "discount" => $detail->discount
            ];
            if($counter == 0){
                $order_dimenions = [
                    'length' => isset($detail->product) ? $detail->product->length : '200',
                    'breadth' => isset($detail->product) ? $detail->product->width : '200',
                    'height' => isset($detail->product) ? $detail->product->height : '200',
                    'weight' => !is_null($detail->product->weight) && $detail->product->weight > 0 ? $detail->product->weight / 1000 : 1,
                ];
            }
            $counter++;
        }

        $orderDetails['order_items'] = $order_details;
        $orderDetails = array_merge($orderDetails, $order_dimenions);

        Log::info('dispatch order -'.json_encode($orderDetails));
        $token =  Shiprocket::getToken();
        $response =  Shiprocket::order($token)->quickCreate($orderDetails);
        Log::info('order-ship'.json_encode($response));
        return $response;
    }

    public function createJuspayCustomer($user)
    {
        $api_key = "52B5EAE481F44D18C09086AAF57D5C";
        $authorization = "Basic " . base64_encode($api_key . ":");

        $response = Http::withHeaders([
            'Authorization' => $authorization,
            'x-merchantid' => 'fastemi',
            'Content-Type' => 'application/json',
        ])->post('https://api.juspay.in/customers', [
            'object_reference_id' => 'test1@gmail.com',
            'mobile_number' => $user->phone,
            'email_address' => $user->email,
            'first_name' => $user->f_name,
            'last_name' => $user->l_name,
            'mobile_country_code' => '91',
            'options.get_client_auth_token' => 'true',
        ]);

        // Check response status and content
        if ($response->successful()) {
            // Successful request, handle response
            $responseData = $response->json();
            return $responseData->id;
        } else {
            // Request failed
            $errorMessage = $response->body();
            // Handle error
        }
    }
}
