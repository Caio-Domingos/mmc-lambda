export interface GuruSubscriptionPaid {
  api_token: string;
  cancel_at_cycle_end: string;
  cancel_reason: string;
  cancelled_by: { name: string; email: string; date: string };
  charged_every_days: number;
  charged_times: number;
  dates: {
    canceled_at: any;
    cycle_end_date: string;
    cycle_start_date: string;
    last_status_at: string;
    next_cycle_at: string;
    started_at: string;
  };
  id: string;
  internal_id: string;
  last_status: string;
  last_transaction: {
    affiliations: [
      {
        contact_email: string;
        currency: string;
        fee: number;
        id: string;
        marketplace_id: string;
        name: string;
        net_value: number;
        value: number;
      },
    ];
    checkout_url: string;
    contact: {
      id: string;
      name: string;
      company_name: string;
      email: string;
      doc: string;
      phone_number: string;
      phone_local_code: string;
      address: string;
      address_number: string;
      address_comp: string;
      address_district: string;
      address_city: string;
      address_state: string;
      address_state_full_name: string;
      address_country: string;
      address_zip_code: string;
      lead: [];
    };
    dates: {
      canceled_at: any;
      confirmed_at: string;
      created_at: string;
      expires_at: any;
      ordered_at: string;
      unavailable_until: string;
      updated_at: string;
      warranty_until: string;
    };
    ecommerces: number[];
    id: string;
    invoice: {
      charge_at: string;
      created_at: string;
      cycle: string;
      discount_value: string;
      id: string;
      increment_value: string;
      period_end: string;
      period_start: string;
      status: string;
      tax_value: string;
      tries: number;
      try: number;
      type: string;
      value: string;
    };
    payment: {
      affiliate_value: number;
      acquirer: {
        code: string;
        message: string;
        name: string;
        tid: number;
      };
      can_try_again: number;
      currency: string;
      discount_value: number;
      gross: number;
      installments: { value: number; qty: number; interest: number };
      marketplace_id: string;
      marketplace_name: string;
      marketplace_value: number;
      method: string;
      net: number;
      refund_reason: string;
      refuse_reason: string;
      tax: { value: number; rate: number };
      total: number;
      credit_card: {
        first_digits: string;
        last_digits: string;
        brand: string;
        id: string;
      };
    };
    product: {
      id: string;
      image_url: string;
      internal_id: string;
      marketplace_id: string;
      marketplace_name: string;
      name: string;
      offer: {
        id: string;
        name: string;
      };
      producer: {
        marketplace_id: string;
        name: string;
        contact_email: string;
      };
      qty: number;
      total_value: number;
      type: string;
      unit_value: number;
    };
    shipment: {
      carrier: string;
      service: string;
      tracking: string;
      value: number;
      status: string;
      delivery_time: string;
    };
    shipping: { name: string; value: number };
    source: {
      source: any;
      checkout_source: any;
      utm_source: any;
      utm_campaign: any;
      utm_medium: any;
      utm_content: any;
      utm_term: any;
      pptc: any[];
    };
    status: string;
    type: string;
  };
  name: string;
  payment_method: string;
  product: {
    id: string;
    name: string;
    marketplace_id: string;
    marketplace_name: string;
  };
  provider: string;
  subscriber: {
    id: string;
    name: string;
    email: string;
    doc: string;
    phone_number: string;
    phone_local_code: string;
    address: string;
    address_number: string;
    address_comp: string;
    address_district: string;
    address_city: string;
    address_state: string;
    address_country: string;
    address_zip_code: string;
  };
  trial_days: number;
  trial_finished_at: any;
  trial_started_at: any;
}
