define([
  'module-demo-backbone/app',
  'module-demo-backbone/view/home-view',
  'module-demo-backbone/collection/article-collection'
],
function (App, HomeView, ArticleCollection) {

  var that = this;

  loadFixtures('index.html');
  that.tagName = 'div';
  that.Events = App.getModuleConfig('module-demo-backbone').Events;

  beforeEach(function() {
    this.$fixture = $('#demo-bb-content');
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

      it('has teasers', function() {
        var self = this;

        runs(function() {
          setTimeout(function() {
            //self.$fixture.append(self.homeView.render().$el);
          });
        },500);

        waitsFor(function() {
          return true;
        }, 'waits for data to load before appending to view', 4000);

        runs(function() {
          //expect(self.$fixture.find('.teasers')).toHaveLength(2);
        });
      });
    });
  });
});