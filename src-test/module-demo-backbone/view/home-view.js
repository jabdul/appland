define([
  'module-demo-backbone/app',
  'module-demo-backbone/view/home-view',
  'hbs!module-demo-backbone/view/tmpl/home'
],
function (App, HomeView, HomeTmpl) {

  var that = this;

  loadFixtures('index.html');
  that.tagName = 'div';
  that.Events = App.getModuleConfig('module-demo-backbone').Events;
  that.LABELS = App.getModuleConfig('module-demo-backbone').labels;

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
  describe('ModuleDemoBackbone: home-view', function () {

    it("Should be tied to a DOM element when created.", function () {
      expect(this.homeView.el.tagName.toLowerCase()).toBe(that.tagName);
    });

    it("has a collection of data providers", function () {
      expect(this.homeView.collection).toBeDefined();
    });

    describe('when rendered', function() {

      it('has teasers', function() {
        var homeView = this.homeView,
            ready = false;

        runs(function() {
          setTimeout(function() {
            spyOn(homeView, 'render');
            homeView.render();
            expect(homeView.render).toHaveBeenCalled();
          });
        },1);

        waitsFor(function() {
          if (homeView.collection.length == 2) {
            ready =  true;
          }
          return ready;
        }, 'waits for data to load before appending to view', 750);

        runs(function() {
          var articles = [],
            cols;

          homeView.collection.each(function(item) {
            articles.push(homeView.generateTeaser(item));
          }, homeView );

          cols = homeView.splitItems(articles, 2);

          homeView.$el.addClass('main-content').html(HomeTmpl({
            labels: that.LABELS[0],
            articlesColumnOne: cols[0],
            articlesColumnTwo: cols[1]
          }));

          expect(homeView.$el.find('.teaser')).toHaveLength(2);
        });
      });
    });
  });
});