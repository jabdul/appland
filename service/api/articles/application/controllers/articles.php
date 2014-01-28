<?php defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Articles extends REST_Controller {

	function index_get()
	{
		$this->_findAll();
	}

	function index_post()
	{
		$this->_findAll();
	}

	/**
	 * Return all articles.
	 * @private
	 */
	 function _findAll() {
	   $display = json_decode(
        file_get_contents('http://localhost:9010/module-demo-backbone/data/mock-articles.json')
     );
     $this->response($display, 200);
	 }
}

/* End of file resource.php */
/* Location: ./system/application/controllers/articles.php */