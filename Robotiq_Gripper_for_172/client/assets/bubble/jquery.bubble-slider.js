/*!
 * Bubble Slider
 * https://github.com/dahjson/bubble-slider
 * Copyright (c) Daniel Johnson
 * MIT License
 */
(function() {
    ! function(t) {
        var e;
        return e = function() {
            function e(e, i) {
                var s, o, r, l, n, h, u, a, b, m, d;
                if(i && i.change)
                    this.change = i.change
                this.element = e, this.element.hide(), this.min = null != (s = this.element.attr("min")) ? s : i.min, this.max = null != (o = this.element.attr("max")) ? o : i.max, this.step = null != (l = this.element.attr("step")) ? l : i.step, this.value = null != (n = this.element.attr("value")) ? n : (i.max - i.min) / 2 + i.min, this.decimals = null != (h = this.element.data("decimals")) ? h : i.decimals, this.prefix = null != (u = this.element.data("prefix")) ? u : i.prefix, this.postfix = null != (a = this.element.data("postfix")) ? a : i.postfix, this.color = null != (b = this.element.data("color")) ? b : i.color, this.bgColor = null != (m = this.element.data("bg-color")) ? m : i.bgColor, this.bubbleColor = null != (d = this.element.data("bubble-color")) ? d : i.bubbleColor, this.bubbleBgColor = null != (r = this.element.data("bubble-bg-color")) ? r : i.bubbleBgColor, this.min = parseFloat(this.removeCommas(this.min)), this.max = parseFloat(this.removeCommas(this.max)), this.step = parseFloat(this.removeCommas(this.step)), this.value = parseFloat(this.removeCommas(this.value)), this.decimals = parseFloat(this.removeCommas(this.decimals)), this.slider = t("<div>")
                    .addClass("bubble-slider-wrap")
                    .insertAfter(this.element),this.minusbtn = t("<div><span>MIN</span></div>")
                    .addClass("bubble-slider-minus-button ")
                    .appendTo(this.slider),
                     this.minus = t("<div><span>-</span></div>")
                    .addClass("bubble-slider-minus")
                    .appendTo(this.slider),this.plusbtn = t("<div><span>MAX</span></div>")
                    .addClass("bubble-slider-plus-button")
                    .appendTo(this.slider), this.plus = t("<div><span>+</span></div>")
                    .addClass("bubble-slider-plus")
                    .appendTo(this.slider), this.track = t("<div>")
                    .addClass("bubble-slider-track")
                    .appendTo(this.slider), this.thumb = t("<div>")
                    .addClass("bubble-slider-thumb")
                    .appendTo(this.track), this.bubble = t("<div><span>")
                    .addClass("bubble-slider-bubble")
                    .appendTo(this.thumb), this.bubbleArrow = t("<div>")
                    .addClass("bubble-slider-bubble-arrow")
                    .prependTo(this.bubble), this.color && (this.minus.css("color", this.color), this.plus.css("color", this.color), this.thumb.css("background", this.color)), this.bgColor && (this.minus.css("border-color", this.bgColor), this.plus.css("border-color", this.bgColor), this.track.css("background", this.bgColor)), this.bubbleColor && this.bubble.children("span")
                    .first()
                    .css("color", this.bubbleColor), this.bubbleBgColor && (this.bubbleArrow.css("background", this.bubbleBgColor), this.bubble.children("span")
                        .first()
                        .css("background", this.bubbleBgColor)), this.dragging = !1, this.limit = 1e3, this.thumbOffset = this.thumb.outerWidth() / 2, this.bubbleNumber = this.bubble.find("span")
                    .first(), this.setValue(this.value), this.positionThumb(this.value), this.thumb.css("-ms-touch-action", "none"), this.thumb.on("mousedown touchstart", function(t) {
                        return function(e) {
                            return t.dragging ? void 0 : (e.preventDefault(), t.dragging = !0)
                        }
                    }(this)), t("html")
                    .on("mousemove touchmove", function(t) {
                        return function(e) {
                            return t.dragging ? ( "touchmove" === e.type ? t.dragThumb(e.originalEvent.touches[0].pageX) : t.dragThumb(e.originalEvent.pageX)) : void 0
                        }
                    }(this))
                    .on("mouseup touchend", function(t) {
                        return function(e) {
                            return t.dragging ? (e.preventDefault(), t.dragging = !1) : void 0
                        }
                    }(this)), this.minus.on("click", function(t) {
                        return function(e) {
                            var i;
                            return e.preventDefault(), i = t.value - t.step, i = Math.max(t.min, i), t.setValue(i), t.positionThumb(i)
                        }
                    }(this)),this.minusbtn.on("click", function(t) {
                        return function(e) {
                            return e.preventDefault(), t.setValue(t.min), t.positionThumb(t.min)
                        }
                    }(this)), this.plus.on("click", function(t) {
                        return function(e) {
                            var i;
                            return e.preventDefault(), i = t.value + t.step, i = Math.min(t.max, i), t.setValue(i), t.positionThumb(i)
                        }
                    }(this)),this.plusbtn.on("click", function(t) {
                        return function(e) {
                            return e.preventDefault(), t.setValue(t.max), t.positionThumb(t.max)
                        }
                    }(this)), t(window)
                    .on("resize onorientationchange", function(t) {
                        return function() {
                            return t.positionThumb(t.value)
                        }
                    }(this))
            }
            return e.prototype.dragThumb = function(t) {
                var e, i, s;
                return i = this.track.offset()
                    .left + this.thumbOffset, e = this.track.offset()
                    .left + this.track.outerWidth() - this.thumbOffset, s = Math.max(i, t), s = Math.min(e, s), this.setValue(this.calcValue()), this.thumb.offset({
                        left: s - this.thumbOffset
                    })
            }, e.prototype.calcValue = function() {
                var t;
                return t = this.normalize(this.thumb.position()
                    .left, 0, this.track.outerWidth() - 2 * this.thumbOffset), t * (this.max - this.min) + this.min
            }, e.prototype.setValue = function(t) {
                var e;
                t = Math.max(this.min, t), t = Math.min(this.max, t)
                this.value = Math.round((t - this.min) / this.step) * this.step + this.min, this.element.val(this.value), e = this.prefix + this.addCommas(this.value.toFixed(this.decimals)) + this.postfix, this.bubbleNumber.text(e)
                if(this.change)
                    this.change("e",this.value);
            }, e.prototype.positionThumb = function(t) {
                var e;
                return e = this.normalize(t, this.min, this.max), this.thumb.offset({
                    left: Math.round(e * (this.track.outerWidth() - 2 * this.thumbOffset) + this.track.offset()
                        .left)
                })
            }, e.prototype.normalize = function(t, e, i) {
                return (t - e) / (i - e)
            }, e.prototype.addCommas = function(t) {
                return t.toString()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
            }, e.prototype.removeCommas = function(t) {
                return t.toString()
                    .replace(/,/g, "")
            }, e
        }(), t.fn.bubbleSlider = function(i) {
            var s, o;
            if(i && i.change)
                this.change = i.change;
            return s = {
                min: 0,
                max: 100,
                step: 1,
                value: 50,
                decimals: 0,
                prefix: "",
                postfix: "",
                color: "",
                bgColor: "",
                bubbleColor: "",
                bubbleBgColor: "",
                change:null
            }, o = t.extend({}, s, t.fn.bubbleSlider.defaults, i), new e(t(this), o)
        }, t(function() {
            return t(".bubble-slider")
                .each(function() {
                    return t(this)
                        .bubbleSlider()
                })
        })
    }(this.jQuery)
})
.call(this);
//# sourceMappingURL=jquery.bubble-slider.js.map