<?php defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';
//error_reporting(0);
/**
 * Articles API Demo
 *
 * The class package is different from the page package!
 * @package Demo
 */
class Articles extends REST_Controller
{
  /**
   * Mock Data.
   * @constant
   */
  const MOCK_DATA = 'http://localhost:9010/module-demo-backbone/data/mock-articles.json';

  /**
   * Return all Articles when using GET method.
   * @return mixed
   */
  function index_get() {
    $this->_findAll();
  }
  /**
   * Return all Articles when using POST method.
   * @return mixed
   */
  function index_post() {
    $this->_findAll();
  }
  /**
   * Return Article resource when using GET method.
   * @return mixed
   */
  function article_get() {
    try {
      $data = $this->_findById($this->get('id'));

      if (is_object($data) && !empty($data)) {
        $this->response($data, 200);
      }
      $this->_handleError(
        $this->get('id'),
        'Article not found.'
      );
    } catch(Exception $e) {
      $this->_handleError(
        $this->get('id'),
        'Article not found.'
      );
    }
  }

  /**
   * Return all Articles.
   *
   * @access private
   * @return mixed
   */
  function _findAll() {
    $data = json_decode(
      file_get_contents(self::MOCK_DATA)
    );

    if (is_object($data) && !empty($data)) {
      $this->response($data, 200);
    }

    $data = array(
      'Error' => 'Articles not found.'
    );
    $this->response($data, 400);
  }
  /**
   * Returns Article
   *
   * @param int $id of article.
   * @access private
   * @return mixed
   */
  function _findById($id) {
    $data = json_decode(
      file_get_contents(self::MOCK_DATA)
    );

    return $data->articles[$id];
  }
  /**
   * Handle Error
   */
  function _handleError($id, $msg) {
    $data = array(
      'Error' => $msg,
      'id' => $id
    );
    $this->response($data, 400);
  }
}

/* End of file resource.php */
/* Location: ./system/application/controllers/articles.php */