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
  const DATA_ARTICLES = 'http://localhost:9010/module-demo-backbone/data/mock-articles.json';
  /**
   * Page number
   * @int
   */
  private $page = -1;
  /**
   * Max number of items per page.
   * @int
   */
  private $limit = 10;

  /**
   * Return all Articles when using GET method.
   * @return mixed
   */
  function index_get() {
    try {
      $this->_setParams();
      $this->_findAll();
    } catch (Exception $e) {
      $this->_handleError(
        null,
        $e->getMessage()
      );
    }
  }
  /**
   * Return all Articles when using POST method.
   * @return mixed
   */
  function index_post() {
    try {
      $this->_setParams();
      $this->_findAll();
    } catch (Exception $e) {
      $this->_handleError(
        null,
        $e->getMessage()
      );
    }
  }
  /**
   * Return Article resource when using GET method.
   * @return mixed
   */
  function article_get() {
    try {
      $this->_findById($this->get('id'));
    } catch(Exception $e) {
      $this->_handleError(
        $this->get('id'),
        $e->getMessage()
      );
    }
  }

  /**
   * Return all Articles.
   *
   * @access private
   * @throws Exception if articles does not exist.
   * @return mixed
   */
  function _findAll() {
    $data = json_decode(
      file_get_contents(self::DATA_ARTICLES)
    );

    if (! isset($data->articles)) {
      throw new Exception('Articles not found.');
    }
    // Pagination
    if ($this->page > 0) {
      $pages = array_chunk($data->articles, $this->limit);
      $data->articles = $pages[$this->page - 1];
    }

    $this->response($data, 200);
  }
  /**
   * Returns Article
   *
   * @param int $id of article.
   * @access private
   * @throws Exception if item does not exist.
   * @return mixed
   */
  function _findById($id) {
    $data = json_decode(
      file_get_contents(self::DATA_ARTICLES)
    );

    if (! isset($data->articles) || ! is_numeric($id)) {
      throw new Exception('Article not found.');
    }

    $articlesArr = $data->articles;

    foreach ($articlesArr as $k => $article) {
      if (isset($article->id) && $article->id === (int) $id) {
        $this->response($article, 200);
      }
    }

    throw new Exception('Article not found.');
  }
  /**
   * Set parameters
   */
  function _setParams() {
    if (is_numeric($this->get('page'))) {
      $this->page = (int) $this->get('page');
    }
    if (is_numeric($this->get('limit'))) {
      $this->limit = (int) $this->get('limit');
    }
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