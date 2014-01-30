<?php defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Metadata extends REST_Controller {

	function index_get()
	{
		$this->output->set_header("HTTP/1.0 200 OK");
		$this->output->set_header("Cache-Control: must-revalidate");
		$this->output->set_header("Content-Type: text/plain; charset=UTF-8");
		$this->output->set_header("Expires: -1");
	}

	function index_post()
	{
		$this->output->set_header("HTTP/1.0 200 OK");
		$this->output->set_header("Cache-Control: must-revalidate");
    $this->output->set_header("Content-Type: text/plain; charset=UTF-8");
    $this->output->set_header("Expires: -1");
	}
}

/* End of file metadata.php */
/* Location: ./system/application/controllers/metadata.php */