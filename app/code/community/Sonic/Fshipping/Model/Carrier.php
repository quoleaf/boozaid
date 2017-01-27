<?php

class Sonic_Fshipping_Model_Carrier extends Mage_Shipping_Model_Carrier_Abstract implements Mage_Shipping_Model_Carrier_Interface {

    protected $_code = 'sonic_fshipping';

    public function collectRates(
    Mage_Shipping_Model_Rate_Request $request
    ) {
        $result = Mage::getModel('shipping/rate_result');
        /* @var $result Mage_Shipping_Model_Rate_Result */
		
		if(!$this->_error){
			$packageQty = $request->getPackageQty();
			$result->append($this->_getStandardShippingRate());
		}
		else{
			$result->append($this->getConfigData('error_message'));	
		}
		
		$price = $this->getConfigData('order_amount');
		$quote = Mage::getModel('checkout/session')->getQuote();
		$cart_price = floor($quote->getData('base_grand_total'));
		if($cart_price > $price){
        	return $result;
		}
    }



    protected function _getStandardShippingRate() {
        $rate = Mage::getModel('shipping/rate_result_method');
        /* @var $rate Mage_Shipping_Model_Rate_Result_Method */
        $rate->setCarrier($this->_code);
        $rate->setCarrierTitle($this->getConfigData('title'));
        $rate->setMethod('express');
        $rate->setMethodTitle($this->getConfigData('method'));
		$price = $this->getConfigData('order_amount');
		$customerList = $this->getConfigData('customer_list');
		
		if($customerList != ""){
			$customersAr = explode(",",$customerList);	
			if(count($customersAr)>0){
				$customers = $customersAr;	
			}
			else{
				$customers = array($customersAr);
			}
			
			$customerData = Mage::getSingleton('customer/session')->getCustomer();
      		$loggedInCustomerId = $customerData->getId();
			
			if(in_array($loggedInCustomerId,$customers)){
				$price = 0;
			}
		}
        $rate->setPrice(0);
        $rate->setCost($price);
        return $rate;
    }

    
    public function getAllowedMethods() {
        return array(
            'standard' => 'Standard'
        );
    }
	
	public function toOptionArray()
	{
		$collection = Mage::getModel('customer/customer')->getCollection()
					   ->addAttributeToSelect('firstname')
					   ->addAttributeToSelect('lastname');
		
		$customer = array();
		$cntr = 0;
		foreach ($collection as $item)
		{
			$customer[$cntr]['value'] = $item->getId();
			$customer[$cntr]['label'] = $item->getFirstname()." ".$item->getLastname();
			$cntr++;
		}
		return $customer;
	}
}
