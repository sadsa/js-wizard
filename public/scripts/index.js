
var myWindow = {};

;(function(w) {

    var page = function(pageId) {
        this._id = pageId;
        this._htmlContent = document.getElementById(pageId);
    };

    page.prototype.setTitle = function (title, selector) {
        document.getElementById(selector).innerHTML = title;
    };

    page.prototype.hide = function () {
        this._htmlContent.style.display = 'none';
    };

    page.prototype.show = function () {
        this._htmlContent.style.display = 'inline';
    };

    var button = function () {
        this._listeners = [];
    };

    button.prototype.addClickListener = function (f) {
        this._listeners.push(f);
    };

    button.prototype.click = function () {
        if (this._listeners.length > 0) {
            for (var i = 0; i < this._listeners.length; i++) {
                this._listeners[i]();
            }
        }
    };

    var wizard = function (backButtonId, nextButtonId) {
        var self = this;
        this._pages = [];
        this._currentPosition = 0;

        this._backButton = new button();
        this._backButton.addClickListener(function () {
            for (var i = 0; i < self._pages.length; i++) {
                self._pages[i].hide();                
            }

            self._currentPosition--;
            self._currentPosition = Math.max(self._currentPosition, 0);
            self._pages[self._currentPosition].show();
        });

        this._nextButton = new button();
        this._nextButton.addClickListener(function () {

            for (var i = 0; i < self._pages.length; i++) {
                self._pages[i].hide();                
            }

            self._currentPosition++;
            self._currentPosition = Math.min(self._currentPosition, self._pages.length - 1);
            self._pages[self._currentPosition].show();
        });

        document.getElementById(backButtonId).addEventListener('click', function () {
            self._backButton.click.call(self._backButton);
        });

        document.getElementById(nextButtonId).addEventListener('click', function () {
            self._nextButton.click.call(self._nextButton);
        });
    };

    wizard.prototype.addPage = function(pageId) {
        this._pages.push(new page(pageId));
    };

    wizard.prototype.next = function () {

    };

    wizard.prototype.back = function () {

    };

    w.Wizard = wizard;

}(window));

var wiz = new Wizard("backButton", "nextButton");
wiz.addPage("step-1");
wiz.addPage("step-2");
wiz.addPage("step-3");
wiz.addPage("step-4");
//wiz.addStep("", "", "")