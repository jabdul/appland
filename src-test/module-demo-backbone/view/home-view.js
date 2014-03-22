define([
  'module-demo-backbone/app',
  'module-demo-backbone/view/home-view',
  'module-demo-backbone/collection/article-collection'
],
function (App, HomeView, ArticleCollection) {

  var that = this;

  that.tagName = 'div';
  that.$container = $('#demo-bb-content');
  that.Events = App.getModuleConfig('module-demo-backbone').Events;

  beforeEach(function() {
    this.homeView = new HomeView();
  });

  afterEach(function() {
    this.homeView.close();
  });

  /**
   * Homepage view test suite.
   */
  describe('ModuleDemoBackbone: homepage view', function () {

    it("Should be tied to a DOM element when created.", function () {
      expect(this.homeView.el.tagName.toLowerCase()).toBe(that.tagName);
    });

    it("has a collection of data providers", function () {
      expect(this.homeView.collection).toBeDefined();
    });

    describe('when rendered', function() {
      var homeView = new HomeView({
        initialize: function() {
          this.collection = new ArticleCollection();
          this.collection.fetch({
            reset: true,
            data: {
              page: 1,
              limit: 2
            },
            processData: true
          });
        }
      });

      beforeEach(function() {
        runs(function() {
          setTimeout(function() {
            homeView.collection.fetch({
              reset: true,
              data: {
                page: 1,
                limit: 2
              },
              processData: true
            });
          });
        },250);

        waitsFor(function() {
          homeView.listenTo( homeView.collection, 'reset', function() {
            that.$container.append(homeView.render().$el);
          });

          return true;
        }, 'waits for data to load before appending to view', 4000);
      });

      it('has teasers', function() {
        runs(function() {
          //console.log(that.$container.find('.teaser'));
          //expect(that.$container.find('.teaser')).toHaveLength(2);
        });

      });
    });
  });
});