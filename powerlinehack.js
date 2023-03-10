(function (s, x, k) { //Made by Dalrae
    function ChromeOrSafari() {
        var isChrome = -1 < navigator.userAgent.indexOf("Chrome"),
            isSafari = -1 < navigator.userAgent.indexOf("Safari");
        if (isChrome && isSafari) {
            isSafari = false;
        }
        return isSafari;
    }
    function CheckGraphics() {
        var GraphicsText = "LOW";
        if (HighGraphicsEnabled) {
            GraphicsText = "HIGH";
        }
        var GraphicsElement = k("#graphicsID")[0];
        if (GraphicsElement) {
            GraphicsElement.childNodes[0].data = "GRAPHICS: " + GraphicsText;
        }
    }
    function StartUpdateElements() {
        k("#copycheckimage").hide();
        k("#copyLink").show();
        k("#copyLinkBox").hide();
        k("#overlay2").fadeIn(200);
        k("#pfArrow").hide();
        k("#pfText").hide();
        setTimeout(function () {
            k("#copycheckimage").fadeIn(300);
        }, 200);
        setTimeout(function () {
            k("#overlay2").fadeOut(200);
            k("#nick").focus();
        }, 1e3);
        CopyLinkBoxVisible = false;
    }
    function DisconnectClient() {
        n && n.disconnect();
    }
    function HideOverlay() {
        k("#overlay").hide();
        OverlayVisible = false;
    }
    function localPlayerDied() {
        k("#overlay").fadeIn(500);
        createAd();
        gameInFocus && k("#nick").focus();
        if (4 <= killCount && T) {
            k("#basePanel").hide();
            k("#statsPanel").show();
            var titleText;
            if (1 == killReason) {
                titleText = interactedSnakeName
                titleText = "KILLED BY<br>" + k("<div>").text(titleText).html()
            }
            else {
                titleText = "COLLIDED";
            }
            k("#stat-title")[0].innerHTML = titleText;
            k("#stat-length")[0].innerText = snakeLength;
            k("#stat-ks")[0].innerText = killStreak;
            k("#stat-top")[0].innerText = leaderboardRank;
            titleText = s.localStorage.bestLength;
            if (titleText < snakeLength || void 0 == titleText) {
                titleText = snakeLength
                s.localStorage.bestLength = snakeLength;
            }
            k("#stat-blength")[0].innerText = titleText;
            titleText = s.localStorage.bestKillStreak;
            if (titleText < killStreak || void 0 == titleText) {
                titleText = killStreak
                s.localStorage.bestKillStreak = titleText;
            }
            k("#stat-bks")[0].innerText = titleText;
            var timeElapsed = (+new Date() - serverTime) / 1e3;
            if (60 < timeElapsed) {
                titleText = Math.floor(timeElapsed / 60)
                timeElapsed = (timeElapsed - 60 * titleText).toFixed(0)
                timeElapsed = titleText + "m " + timeElapsed + "s"
            }
            else {
                timeElapsed = timeElapsed.toFixed(1) + "s";
            }
            k("#stat-time")[0].innerText = timeElapsed;
            killStreak = snakeLength = leaderboardRank = 0;
        }
        if (4 > killCount) { 
            L.initSpeedupTutorial()
            L.fadeOutGame();
        }
    }
    function killPlayerDelay() {
        OverlayVisible = true;
        if (!isInGame) {
            snake = null;
        }
        setTimeout(localPlayerDied, 1e3);
    }
    function isSiteValid() {
        try {
            return s.self !== s.top;
        } catch (a) {
            return true;
        }
    }
    function nextTip() {
        if (4 <= killCount && T) {
          if (tipsInited) {
            k("#overlay").css({ "background-color": "rgba(0,0,0,0.4)" })
            tipsInited = true;
          }
          else {
            tipID++
            if (2 < tipID) {
              tipID = 0
            }
            nextTipID = tipID
            tipDebounce = true
          }
        }
    }
    function createAd() {
        if (!debug)
            if (null != adsense && adsense) {
                if (0 == adID) {
                    cpmstarAPI({ kind: "createmodule", module: "anchor79284", config: { kind: "anchor", options: { dir: 1, width: "1050px" }, request: { poolid: "79284", kind: "banner" } } })
                }
                else {
                    cpmstarAPI({ kind: "adcmd", module: "anchor79284", command: "refresh" })
                }
                if (s.googletag) {
                    s.googletag.cmd.push(function () {
                        if (kb) {
                            kb = false
                            setTimeout(function () {
                                kb = true;
                            }, 12e4)
                            if (s.googletag && s.googletag.pubads && s.googletag.pubads().refresh) {
                                s.googletag.pubads().refresh(s.ads);
                            }
                        }
                    })
                    adID++;
                }
            }
            else {
                k("#mpu-top").show();
                var adBox = k("#ldr-top");
                adBox && adBox.show();
                refreshSlots();
            }
    }
    function Ob(a, c) { // No clue
        var f = lb(a, c, O.x, O.y);
        return Math.max(0, Math.min(1, 1 - f / 400));
    }
    function getDirectionVector(direction) {
        switch (direction) {
            case 1:
                return { x: 0, y: -1 };
            case 2:
                return { x: -1, y: 0 };
            case 4:
                return { x: 1, y: 0 };
            case 3:
                return { x: 0, y: 1 };
        }
        return { x: 0, y: 0 };
    }
    function ua(a, c, f, d) { //No clue
        a -= f;
        c -= d;
        return Math.sqrt(a * a + c * c);
    }
    function Pa(a, c) { //No clue
        var f = Math.sqrt(a * a + c * c);
        return { x: a / f, y: c / f };
    }
    function Qa(a, c) {
        for (var f = ""; ; ) {
            var d = a.getUint16(c, true);
            c += 2;
            if (0 == d) break;
            f += String.fromCharCode(d);
        }
        return { nick: f, offset: c };
    }
    function lb(a, c, f, d) { //No clue
        return Math.sqrt((f - a) * (f - a) + (d - c) * (d - c));
    }
    function Aa(a, c, f) { //No clue
        var d = z.getBounds();
        return a + f >= d[0].x && a - f <= d[1].x && c + f >= d[0].y && c - f <= d[1].y ? true : false;
    }
    function mb(a, c, f) { //No clue
        return a < c ? c : a > f ? f : a;
    }
    function generateBrushTable(size, color, stroke, strokeColor) {
        if (size) {
            this._size = size;
        }
        if (color) {
            this._color = color;
        }
        this._stroke = !!stroke;
        if (strokeColor) {
            this._strokeColor = strokeColor;
        }
    }
    function formatName(name) {
        if ("" == name) {
            name = "<Unnamed>";
        }
        return name;
    }
    function Ra(a, c, f, d, h, g) { //No clue
        g /= 2;
        a.beginPath();
        a.moveTo(c, f + g);
        a.lineTo(c, f + h - g);
        a.quadraticCurveTo(c, f + h, c + g, f + h);
        a.lineTo(c + d - g, f + h);
        a.quadraticCurveTo(c + d, f + h, c + d, f + h - g);
        a.lineTo(c + d, f + g);
        a.quadraticCurveTo(c + d, f, c + d - g, f);
        a.lineTo(c + g, f);
        a.quadraticCurveTo(c, f, c, f + g);
        a.closePath();
        a.fill();
    }
    function mc(a, c, f, d, h, g) { //No clue
        g /= 2;
        a.beginPath();
        a.moveTo(c, f + g);
        a.lineTo(c, f + h);
        a.lineTo(c + d, f + h);
        a.lineTo(c + d, f + g);
        a.quadraticCurveTo(c + d, f, c + d - g, f);
        a.lineTo(c + g, f);
        a.quadraticCurveTo(c, f, c, f + g);
        a.closePath();
        a.fill();
    }
    function Pb(a, c, f) { //No clue
        var d = a * Math.cos(f) - c * Math.sin(f);
        a = c * Math.cos(f) + a * Math.sin(f);
        return { x: d, y: a };
    }
    var urlSplit = s.location.href.split("/"),
        website = urlSplit[2],
        websiteSplit = website.split(".");
    roomCode = urlSplit[urlSplit.length - 1];
    var websiteSplitSize = websiteSplit.length,
        isHttps = "https:" == s.location.protocol,
        statsElement,
        otherStatsElement,
        leaderboardRank = 0,
        snakeLength = 0,
        killStreak = 0,
        serverTime = 0,
        interactedSnakeName = "",
        killReason = 0,
        OneHundred = (1e3 / 30) * 3,
        mySnake,
        spawnPosX = 0,
        spawnPosY = 0,
        O = { x: 0, y: 0 }, //Used for old game?
        ca = 1600,
        da = 5e3,
        W = 0,
        la = 0,
        Ta = 1.4,
        Tb = 1,
        Ub = 100,
        pb = 20,
        ea,
        V,
        isInGame = false,
        gameInFocus = true,
        qb = false,
        P = 0,
        rb = 0,
        OverlayVisible = true,
        Ua = 0,
        sb = 1,
        tb = false,
        q = 1,
        ub = 0,
        HighGraphicsEnabled = true,
        vb = false,
        Va = 1.2,
        wb = Ta,
        xb = false,
        Vb = false,
        Wa = 0,
        ma = 0,
        killCount = s.localStorage.killCount;
    if (void 0 == killCount || "undefined" == killCount) killCount = 0;
    var Fa = 0,
        Ga = false,
        tipsInited = false,
        kb = true,
        T = false,
        adID = 0,
        Xa = false,
        L,
        G,
        t,
        n,
        y = {},
        snake,
        Z = 0,
        z,
        I,
        yb,
        Ya,
        zb,
        pa = 0,
        Wb = 0,
        Ha = 0,
        Ia = 0,
        Za,
        $a,
        ab,
        bb,
        Xb = 0,
        cb = 0,
        xa = 1,
        CopyLinkBoxVisible = false,
        db = 110,
        Ab = true,
        Yb = 0,
        Zb = 40,
        Ja = false,
        D,
        R = 1,
        last_dir = 0,
        S = s.localStorage.muteVol;
    if (void 0 == S || "undefined" == S) S = 1;
    var Ca = 0,
        ia = s.localStorage.arrows,
        wa = s.localStorage.speedUpTut;
    wa || (wa = 0);
    var $b = "LOL;EASY!;OOPS!;I DARE YOU!;GOTCHA!;RUN!;TEAM?;YES!;NO!;KILL THE KING!".split(";");
    if (!wa && 3 < killCount) {
        wa = 1
        s.localStorage.speedUpTut = wa;
    }
    if ("true" == s.localStorage.lq) {
        HighGraphicsEnabled = false;
    }
    if (void 0 == s.localStorage.version || 1.05 > s.localStorage.version) (s.localStorage.version = 1.05), k("#updated").show();
    var eb = null,
        ac = function () {
            var a = "";
            if (isHttps) {
                a = "s";
            }
            k.get(
                "http" + a + "://ip2l.wings.io/cc",
                function (a) {
                    eb = a.substring(0, 2);
                    s.localStorage.wingsCC = eb;
                    s.localStorage.wingsCCTime = +new Date();
                },
                "text"
            );
        };
    void 0 == s.localStorage.wingsCCTime || (void 0 != s.localStorage.wingsCC && 2 != s.localStorage.wingsCC.length) ? ac() : 288e5 < +new Date() - s.localStorage.wingsCCTime ? ac() : (eb = s.localStorage.wingsCC);
    var Bb = function () {
            P = +new Date();
            var a = 0;
            if (0 < rb) {
                a = P - rb;
            }
            rb = P;
            L.update(a);
            L.draw(a);
            s.requestAnimationFrame && s.requestAnimationFrame(Bb);
            if (qb) {
                qb = false;
            }
        },
        oc = function () {
            otherStatsElement = new Stats();
            otherStatsElement.setMode(1);
            var a = x.getElementById("canvas");
            otherStatsElement.domElement.style.position = "absolute";
            otherStatsElement.domElement.style.left = 0.25 * a.width + "px";
            otherStatsElement.domElement.style.top = a.height - 18 - 30 + "px";
            x.getElementById("fps").appendChild(otherStatsElement.domElement);
            statsElement = new Stats();
            statsElement.domElement.style.position = "absolute";
            statsElement.domElement.style.left = 0.25 * a.width - 100 + "px";
            statsElement.domElement.style.top = a.height - 18 - 30 + "px";
            x.getElementById("fps").appendChild(statsElement.domElement);
            setInterval(function () {
                statsElement.update();
            }, 1e3 / 60);
            otherStatsElement.domElement.style.visibility = "hidden";
            statsElement.domElement.style.visibility = "hidden";
        };
    x.body.onselectstart = function () {
        return false;
    };
    s.clickPlay = function (a) {
        L.clearSpeedupTutorial();
        if (n.hasConnection) {
            if (isInGame) {
                HideOverlay();
            } else {
                s.localStorage.nick = a;
                ub++;
                mySnake.mouseMoved = false;
                n.sendNick(a, tb);
                if (6 > ub && I && 0 == ub%3) {
                    I.showTip("Press 'M' to Toggle Sounds", 4e3);
                }
                if (tb) {
                    k("#continueTop").hide();
                    k("#continueBR").hide();
                    k("#continue").hide();
                    k("#nickInput").show(); 
                    k("#skinPanel").hide();
                    k("#howto").show();
                    k("#beta").show();
                    tb = false;
                }
            }
        } else {
            k("#topGui").hide();
            k("#topGuiConnecting").show();
        }
    };
    s.setSpectate = function (a) {};
    s.setContinue = function () {
        k("#topGui").show();
        k("#roomFailed").hide();
        isSiteValid() || (parent.location.hash = "");
        n.getServerAndConnect();
    };
    s.toggleGraphics = function () {
        HighGraphicsEnabled = !HighGraphicsEnabled;
        L.resize();
        s.localStorage.lq = !HighGraphicsEnabled;
        Eb();
    };
    s.copyRoomLink = function () {
        k("#copyLink").hide();
        k("#copyLinkBox").show();
        var a = k("#roomlinkInput")[0];
        a.value = "http://powerline.io/#" + n.roomID;
        CopyLinkBoxVisible = true;
        if (ChromeOrSafari()) {
            k("#copyButton")[0].childNodes[0].data = "Close"
            k("#safariTooltip").show();
        }
        setTimeout(function () {
            a.setSelectionRange(0, a.value.length);
            a.select();
            a.focus();
        }, 100);
    };
    s.setCopy = function () {
        var a = k("#roomlinkInput")[0];
        a.value = "http://powerline.io/#" + n.roomID;
        a.setSelectionRange(0, a.value.length);
        a.select();
        a.focus();
        if (ChromeOrSafari()) k("#copyLinkBox").hide(), k("#copyLink").show(), (CopyLinkBoxVisible = false);
        else {
            try {
                x.execCommand("copy");
            } catch (c) {}
            StartUpdateElements();
        }
    };
    s.clickNoNames = function (a) {
        vb = !vb;
        a.checked = vb;
    };
    var bc = s.navigator.userAgent,
        pc = -1 < bc.indexOf("MSIE ") || -1 < bc.indexOf("Trident/");
    if ("undefined" !== typeof s.orientation) {
        s.location.href = "https://play.google.com/store/apps/details?id=com.profusionstudios.powerlineio";
    }
    if (pc) {
        k("#sndIcon").hide();
    }
    var fb;
    s.onblur = function () {
        debug || (fb = setTimeout(DisconnectClient, 3e5));
        gameInFocus = false;
        R = 0;
        for (var a in y) {
            var c = y[a];
            if (1 == c.snake) c.onBlur();
        }
    };
    s.onfocus = function (a) {
        if (!a || a.target == s) {
            if (fb) {
                clearTimeout(fb), (fb = null);
            }
            qb = gameInFocus = true;
            for (var c in y) y[c].resume();
            !n || n.hasConnection || isSiteValid() ? OverlayVisible && k("#nick").focus() : n.getServerAndConnect();
            if (1 == S) {
                R = 1;
            }
        }
    };
    if (s.localStorage.nick) {
        k("#nick")[0].value = s.localStorage.nick;
    }
    var fa = 0,
        tipID = 0,
        tipDebounce = false;
    setInterval(function () {
        if (OverlayVisible) {
            var a = k("#tips")[0],
                c = 0.5 * Math.PI;
            fa += 0.3;
            if (fa > c && 0 == tipDebounce) {
                fa = c;
            }
            c = (Math.sin(fa) + 1) / 2;
            if (fa > 1.5 * Math.PI) {
                tipID = nextTipID;
                fa -= 2 * Math.PI;
                tipDebounce = false;
                var f;
                switch (tipID) {
                    case 0:
                        f = "GET CLOSE TO OTHER SNAKES TO BOOST";
                        break;
                    case 1:
                        f = "CROSS OTHER PLAYERS";
                        break;
                    default:
                        f = "EAT TO GROW";
                }
                a.innerHTML = f;
            }
            a.style.opacity = Math.sqrt(c, 5);
        }
    }, 50);
    tips.innerHTML = "GET CLOSE TO OTHER SNAKES TO BOOST";
    localPlayerDied();
    s.onbeforeunload = function () {
        if (isInGame) return "Are you sure you want to quit?";
    };
    x.oncontextmenu = function () {
        return false;
    };
    s.toggleSound = function () {
        var a = "images/sound_off.png";
        1 == S ? ((R = S = 0), I && I.showTip("Sounds Disabled", 3e3)) : 0 == S && ((R = S = 1), (a = "images/sound_on.png"), I && I.showTip("Sounds Enabled", 3e3));
        s.localStorage.muteVol = S;
        k("#soundImg")[0].src = a;
    };
    if (0 == S) {
        S = 1;
        toggleSound();
    }
    x.getElementById("overlay").onmousedown = function (a) {
        return a.target == k("#nick")[0] ? true : false;
    };
    createAd();
    generateBrushTable.prototype = {
        _value: "",
        _color: "#000000",
        _stroke: false,
        _strokeColor: "#000000",
        _strokeWidth: 3,
        _size: 16,
        _canvas: null,
        _ctx: null,
        _dirty: false,
        _scale: 1,
        _font: "px 'proxima-nova-1','proxima-nova-2', Arial Black",
        _usingRoundedFrame: false,
        _hmargin: 0,
        _vmargin: -1,
        _margin: 6,
        _frameOpacity: 0.3,
        _shadowBlur: 0,
        _roundedFrameStyle: "#006666",
        _addTop: 0,
        _minWidth: 0,
        setAddTop: function (a) {
            a != this._addTop && ((this._addTop = a), (this._dirty = true));
        },
        setMinWidth: function (a) {
            a != this._minWidth && ((this._minWidth = a), (this._dirty = true));
        },
        setFont: function (a) {
            this._font != a && ((this._font = a), (this._dirty = true));
        },
        setSize: function (a) {
            this._size != a && ((this._size = a), (this._dirty = true));
        },
        setScale: function (a) {
            this._scale != a && ((this._scale = a), (this._dirty = true));
        },
        setColor: function (a) {
            this._color != a && ((this._color = a), (this._dirty = true));
        },
        setStroke: function (a) {
            this._stroke != a && ((this._stroke = a), (this._dirty = true));
        },
        setShadowBlur: function (a) {
            this._shadowBlur != a && ((this._shadowBlur = a), (this._dirty = true));
        },
        setStrokeWidth: function (a) {
            this._strokeWidth != a && ((this._strokeWidth = a), (this._dirty = true));
        },
        setStrokeColor: function (a) {
            this._strokeColor != a && ((this._strokeColor = a), (this._dirty = true));
        },
        setValue: function (a) {
            a != this._value && ((this._value = a), (this._dirty = true));
        },
        setHMargin: function (a) {
            a != this._hmargin && ((this._hmargin = a), (this._dirty = true));
        },
        setVMargin: function (a) {
            a != this._vmargin && ((this._vmargin = a), (this._dirty = true));
        },
        setMargin: function (a) {
            a != this._margin && ((this._margin = a), (this._dirty = true));
        },
        setUsingRoundedFrame: function (a) {
            a != this._usingRoundedFrame && ((this._usingRoundedFrame = a), (this._dirty = true));
        },
        setRoundedFrameOpacity: function (a) {
            a != this._frameOpacity && ((this._frameOpacity = a), (this._dirty = true));
        },
        setRoundedFrameStyle: function (a) {
            a != this._roundedFrameStyle && ((this._roundedFrameStyle = a), (this._dirty = true));
        },
        render: function () {
            null == this._canvas && ((this._canvas = x.createElement("canvas")), (this._ctx = this._canvas.getContext("2d")));
            if (this._dirty) {
                this._dirty = false;
                var a = this._canvas,
                    c = this._ctx,
                    f = this._value,
                    d = this._scale,
                    h = this._size,
                    g = "Bold " + h + this._font;
                c.font = g;
                var e = c.measureText(f).width,
                    b = 0;
                e < this._minWidth && ((b = this._minWidth - e), (e = this._minWidth));
                var h = h - 0.1 * h,
                    l = this._margin;
                this._shadowBlur > l && (l = this._shadowBlur);
                a.width = (e + 2 + 2 * l) * d;
                a.height = (h + 2 * l + this._addTop) * d;
                c.font = g;
                c.textBaseline = "middle";
                c.scale(d, d);
                c.globalAlpha = 1;
                this._usingRoundedFrame && ((c.fillStyle = this._roundedFrameStyle), (c.globalAlpha = this._frameOpacity), Ra(c, 0, 0, a.width, a.height, 30), (c.globalAlpha = 1));
                a = l + b / 2;
                h = l + this._addTop + h / 2;
                c.fillStyle = this._color;
                this._stroke && ((c.lineJoin = "round"), (c.lineWidth = this._strokeWidth), (c.strokeStyle = this._strokeColor), c.strokeText(f, a, h));
                0 < this._shadowBlur && ((c.shadowBlur = this._shadowBlur), (c.shadowColor = this._strokeColor));
                c.fillText(f, a, h);
            }
            return this._canvas;
        },
    };
    var qc = function () {
            this.loaded = false;
            this.onLoad = null;
            this.spriteSheetLoaded = false;
            this.gameSheet;
            this.frames = {};
            this.skullRedGlow = this.skullDarkBlueGlow = this.skullPurpleGlow = this.skullRed = this.skullDarkBlue = this.skullPurple = this.bgGrid = this.boostImage = this.keysImage = null;
            this.loadGameSpritesheet = function () {
                this.gameSheet = new Image();
                this.gameSheet.src = "images/sheet.png?v=3";
                this.gameSheet.onload = function () {
                    t.loadGameSpritesheetFrames();
                    t.spriteSheetLoaded = true;
                    t.loadPatterns();
                    t.skullDarkBlue = t.frames.skullbase.renderTintedFrame("#2a9de3");
                    t.skullDarkBlueGlow = t.frames.skullglow.renderTintedFrame("#1931d6");
                    t.skullPurple = t.frames.skullbase.renderTintedFrame("#c12ee5");
                    t.skullPurpleGlow = t.frames.skullglow.renderTintedFrame("#0000FF");
                    t.skullRed = t.frames.skullbase.renderTintedFrame("#ff2222");
                    t.skullRedGlow = t.frames.skullglow.renderTintedFrame("#552255");
                    t.loaded = true;
                    t.onLoad();
                };
            };
            this.loadPatterns = function () {
                var a = t.frames.grid.renderToCanvas();
                t.bgGrid = L.context.createPattern(a, "repeat");
            };
            this.loadGameSpritesheetFrames = function () {
                for (var a = gameSheetInfo.length, c = 0; c < a; c++) {
                    var f = gameSheetInfo[c],
                        d = new gb();
                    d.setFrameInfo(f, this.gameSheet);
                    this.frames[f[0]] = d;
                }
            };
            this.load = function (a) {
                this.onLoad = a;
                this.loadGameSpritesheet();
                this.keysImage = new Image();
                this.keysImage.src = "images/arrows.png";
                this.keysImage.onload = function () {};
                this.boostImage = new Image();
                this.boostImage.src = "images/close-to-boost-w.png";
                this.boostImage.onload = function () {};
            };
            this.loadTintImage = function (a, c, f) {
                var d = x.createElement("canvas"),
                    h = d.getContext("2d"),
                    g = a.width,
                    e = a.height;
                d.width = g;
                d.height = e;
                var b = x.createElement("canvas");
                b.width = g;
                b.height = e;
                g = b.getContext("2d");
                g.fillStyle = f;
                g.fillRect(0, 0, b.width, b.height);
                g.globalCompositeOperation = "destination-atop";
                g.drawImage(a, 0, 0);
                h.globalAlpha = 1;
                h.drawImage(b, 0, 0);
                c(d);
            };
        },
        rc = function () {
            var a = this;
            this.mouseMoved = false;
            this.direction = 1;
            var c = 0,
                f = 0;
            a.mousedown = function (a) {
                OverlayVisible || (f++, 2 < f && ((ia = void 0), (f = c = 0)), (spawnPosX = a.clientX), (spawnPosY = a.clientY));
            };
            a.keydown = function (d) {
                if (OverlayVisible && (d.metaKey || d.ctrlKey) && 65 == d.keyCode) {
                    var f = k("#nick")[0];
                    f.setSelectionRange(0, f.value.length);
                }
                f = k("#statsPanel").is(":visible");
                if (OverlayVisible && f) 13 == d.keyCode || 32 == d.keyCode ? clickPlay(s.localStorage.nick) : 27 == d.keyCode && (k("#statsPanel").hide(), k("#basePanel").show(), k("#nick").focus());
                else if (67 == d.keyCode && OverlayVisible && CopyLinkBoxVisible)
                    setTimeout(function () {
                        StartUpdateElements();
                    }, 10);
                else if (!OverlayVisible) {
                    32 == d.keyCode && void 0 != ia && 0 != ia && (Ca = 1e3);
                    73 == d.keyCode &&
                        (Xa ? ((otherStatsElement.domElement.style.visibility = "hidden"), (statsElement.domElement.style.visibility = "hidden")) : ((otherStatsElement.domElement.style.visibility = "visible"), (statsElement.domElement.style.visibility = "visible"), n.ping()), (Xa = !Xa));
                    snake &&
                        0 < Ja &&
                        ((49 <= d.keyCode && 57 >= d.keyCode) || 48 == d.keyCode
                            ? snake.canTalk()
                                ? 49 <= d.keyCode && 57 >= d.keyCode
                                    ? (n.sendTalk(d.keyCode - 49 + 1), I.hideTalkLayer())
                                    : 48 == d.keyCode && (n.sendTalk(10), I.hideTalkLayer())
                                : I.cantTalk()
                            : 84 == d.keyCode && I.toggleTalkLayer());
                    if (debug)
                        if (75 == d.keyCode) n.leave();
                        else if (76 == d.keyCode) Ga || n.bigPicture(), (z.x = 0), (z.y = 0), (z.zoom = 0.3599), (isInGame = false), (Ga = true);
                        else if (88 != d.keyCode && 67 == d.keyCode) {
                            Object.keys(y);
                            Object.keys(y);
                            var g = (f = 0),
                                e;
                            for (e in y) {
                                var b = y[e];
                                b.snake && ((f += b.getTestValue()), g++);
                            }
                            console.log("Snakes: " + g + ", Sum: " + f);
                            console.log("Arena Size: " + da / 10);
                        }
                    snake
                        ? ((e = snake.x),
                          (f = snake.y),
                          (g = db),
                          (last_dir = a.direction),
                          38 == d.keyCode || 87 == d.keyCode
                              ? 0 != a.direction && ((a.direction = 1), a.fake_turn(a.direction, e, f, g, 0, last_dir))
                              : 37 == d.keyCode || 65 == d.keyCode
                              ? 0 != a.direction && ((a.direction = 2), a.fake_turn(a.direction, e, f, g, 0, last_dir))
                              : 40 == d.keyCode || 83 == d.keyCode
                              ? 0 != a.direction && ((a.direction = 3), a.fake_turn(a.direction, e, f, g, 0, last_dir))
                              : (39 != d.keyCode && 68 != d.keyCode) || ((a.direction = 4), a.fake_turn(a.direction, e, f, g, 0, last_dir)))
                        : Ga && ((e = 0.01), d.shiftKey && (e = 0.1), 38 == d.keyCode ? (z.zoom += e) : 40 == d.keyCode && (z.zoom -= e), console.log(z.zoom), console.log(da / 10));
                    70 == d.keyCode
                        ? (x.fullscreenElement || x.mozFullScreenElement || x.webkitFullscreenElement || x.msFullscreenElement
                              ? x.exitFullscreen
                                  ? x.exitFullscreen()
                                  : x.msExitFullscreen
                                  ? x.msExitFullscreen()
                                  : x.mozCancelFullScreen
                                  ? x.mozCancelFullScreen()
                                  : x.webkitExitFullscreen && x.webkitExitFullscreen()
                              : x.documentElement.requestFullscreen
                              ? x.documentElement.requestFullscreen()
                              : x.documentElement.msRequestFullscreen
                              ? x.documentElement.msRequestFullscreen()
                              : x.documentElement.mozRequestFullScreen
                              ? x.documentElement.mozRequestFullScreen()
                              : x.documentElement.webkitRequestFullscreen && x.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT),
                          I.clearTip())
                        : 77 == d.keyCode
                        ? toggleSound()
                        : 90 == d.keyCode && debug && isInGame && (xb = !xb);
                    2 < c && ((ia = 1), (s.localStorage.arrows = ia));
                }
            };
            a.keyup = function (a) {};
            this.fake_turn = function(a, f, g, e, b, last_dir) {
                if (((last_dir + a) % 2 != 0) || (last_dir == 0 || a == 0)) {
                    this.turn(a, f, g, e, b, false, true, false);
                } else if (last_dir != a) {
                    if ((last_dir - 1) < 1) {
                        this.turn(last_dir + 3, f, g, e, b, true, true, false);
                    } else {
                        this.turn(last_dir - 1, f, g, e, b, true, true, false);
                    }
                    this.turn(a, f, g, e, b, true, true, false);
                }
            }
            this.turn = function (a, f, g, e, b, is_zero, send_turn, is_jump) {
                console.log(a, f, g, e, b, "1");
                c++;
                console.log(Ab);
                Ab ? ((f = +new Date()), (g = f - Yb), (Yb = f), 30 > g && (e += 30), (e = snake.addTurnPoint(a, e, is_zero, is_jump)), (f = 10 * e.x), (g = 10 * e.y), (console.log(a, f, g, e, b, "2")), ((send_turn) && (n.sendTurnPoint(a, 3 == a || 1 == a ? f / 10 : -g / 10)))) : n.sendDirection(a);
            };
            this.addListeners = function () {
                x.addEventListener("mousedown", a.mousedown, false);
                x.addEventListener("keydown", a.keydown, false);
                x.addEventListener("keyup", a.keyup, false);
            };
        },
        sc = function () {
            var a = [],
                c = [];
            this.draw = function (a) {
                for (var d = [], h = c.length, g = 0; g < h; g++) {
                    var e = c[g];
                    e.a -= 0.1;
                    0 < e.a ? (a.save(), a.beginPath(), (a.fillStyle = "rgba(255,0,0,1.0)"), (a.globalAlpha = e.a), a.arc(e.x, e.y, 50 * Math.sqrt(1 - e.a), 0, 2 * Math.PI), a.closePath(), a.fill(), a.restore()) : d.push(e);
                }
                for (a = 0; a < d.length; a++) (h = c.indexOf(d[a])), c.splice(h, 1);
                d.length = 0;
            };
            this.addExplosion = function (a, d) {
                var h = {};
                h.x = a;
                h.y = d;
                h.a = 1;
                c.push(h);
            };
            this.addShot = function (f, d, c, g) {
                if (50 > +new Date() - P && T) {
                    var e = players[f];
                    if (e) {
                        var b = {};
                        b.id = f;
                        b.angle = e.angle;
                        b.isKing = currentKingID == f;
                        b.hitPosition = { x: 10 * d, y: 10 * c };
                        b.special = 0;
                        gameEvent.isInstagib() ? (b.special = 1) : gameEvent.isSpaceWars() && (b.special = 2);
                        b.a = 1;
                        b.weapon = g;
                        d = Pb(0, -10, e.angle);
                        f = e.x + d.x;
                        c = e.y + d.y;
                        b.origPosition = { x: f, y: c };
                        e = b.hitPosition.x - f;
                        d = b.hitPosition.y - c;
                        g != WEAPON_LASER &&
                            ((g = Math.sqrt(e * e + d * d)), (b.direction = { x: e / g, y: d / g }), (b.curPosition = { x: f, y: c }), (b.finish = false), (Aa(f, c, 100) || Aa(b.hitPosition.x, b.hitPosition.y, 100)) && a.push(b));
                        g = areaHeight / 2;
                        b.hitPosition.y > g && ((f = d / e), yb.addSplash((g - (b.hitPosition.y - f * b.hitPosition.x)) / f, g + 6, 1, false));
                    }
                }
            };
            this.addMissileImpact = function (a, d) {
                var c = 10 * a,
                    g = 10 * d;
                if (Aa(c, g, 100) && 50 > +new Date() - P) {
                    var e = G.createAnimation("explosion");
                    e.setScale(1);
                    e.posX = 10 * a;
                    e.posY = 10 * d;
                    G.runAnimationBehind(e);
                    c = 1 - lb(c, g, O.x, O.y) / PLAY_DISTANCE;
                    D.playSound(SOUND_MISSILE_EXPL, c, 1, cc, null);
                }
            };
            this.addSplash = function (a, d, c, g) {
                if (drawSplashes && !gameEvent.isSpaceWars() && Aa(a, d, 100) && 50 > +new Date() - P) {
                    var e = G.createAnimation("splash"),
                        b = G.createAnimation("splashReflex");
                    e.setScale(c);
                    g && (e.scaleX *= 1.2 + 0.4 * Math.random());
                    e.posX = a;
                    e.posY = d - (61 * e.scaleY) / 2;
                    G.runAnimation(e);
                    b.scaleX = e.scaleX;
                    b.posX = e.posX;
                    b.posY = e.posY + 77;
                    b.scaleY = -2;
                    G.runAnimationLayer2(b);
                }
            };
        },
        uc = function () {
            var a,
                c,
                f,
                d = 0,
                h,
                g,
                e,
                b,
                l,
                r = 0,
                v = 0,
                J = false,
                C,
                u,
                m,
                k,
                n,
                y,
                z,
                D,
                Ka = 0,
                ya = true,
                E = 300,
                X = false,
                F = null,
                A = null,
                qa = 0,
                w = 0,
                H = 0,
                G = 0,
                L,
                M,
                P,
                R,
                T,
                ga,
                $ = 0,
                Y = 0,
                ja;
            this.draw = function (m) {
                if (0 < d) {
                    var k = 0,
                        C = +new Date() - d;
                    4e3 > C ? (k = 3e3 > C ? 1 : 1 - (C - 3e3) / 1e3) : (d = 0);
                    C = false;
                    if (!g) {
                        var n = 22;
                        f ? ((e = new generateBrushTable(36 * q, "#00FFFF", false, "#00AAAA")), e.setValue(f), e.setUsingRoundedFrame(true), (C = true), e.setAddTop(35), e.setShadowBlur(4)) : ((e = null), (n = 35));
                        g = new generateBrushTable(n * q, "#00FFFF", false, "#00AAAA");
                        g.setValue(c);
                        g.setUsingRoundedFrame(!C);
                        g.setShadowBlur(3);
                        f || g.setAddTop(-2);
                    }
                    n = 0.21 * canvas.height;
                    1 == h &&
                        ((n = 0.55 * canvas.height),
                        g.setColor("#f90600"),
                        g.setStrokeColor("#f90600"),
                        g.setRoundedFrameStyle("#f90600"),
                        e && (e.setColor("#f90600"), e.setStrokeColor("#f90600"), e.setRoundedFrameStyle("#FF9999"), e.setRoundedFrameOpacity(0.1)));
                    var t = g.render();
                    C && e.setMinWidth(t.width);
                    var hb;
                    f && (hb = e.render());
                    m.globalAlpha = k;
                    m.save();
                    m.scale(q, q);
                    hb && m.drawImage(hb, (0.5 * canvas.width) / q - hb.width / 2, (n - 5) / q);
                    m.drawImage(t, (0.5 * canvas.width) / q - t.width / 2, n / q);
                    m.restore();
                    m.globalAlpha = 1;
                }
                0 < r &&
                    ((k = 0),
                    (C = +new Date() - r),
                    4e3 > C ? (3e3 > C ? ((k = C / 200), 1 < k && (k = 1)) : (k = 1 - (C - 3e3) / 1e3)) : (r = 0),
                    (C = false),
                    b || ((n = v), (b = new generateBrushTable(n * q, "#00FFFF", false, "#00AAAA")), b.setValue(l), b.setUsingRoundedFrame(!C), b.setShadowBlur(3), b.setAddTop(-2)),
                    (n = 0.7 * canvas.height),
                    b.setColor("#00FFFF"),
                    b.setStrokeColor("#00FFFF"),
                    b.setRoundedFrameStyle("#00FFFF"),
                    b.setRoundedFrameOpacity(0.11),
                    (t = b.render()),
                    (m.globalAlpha = k),
                    m.save(),
                    m.scale(q, q),
                    m.drawImage(t, (0.5 * canvas.width) / q - t.width / 2, n / q),
                    m.restore(),
                    (m.globalAlpha = 1));
                if (isInGame && snake) {
                    (L && H == Fa) || ((L = new generateBrushTable(15 * q, "#00FFFF", false, "#00AAAA")), L.setValue("KILLS: " + Fa), (P = L.render()), (killStreak = H = Fa));
                    (M && G == w) || ((M = new generateBrushTable(15 * q, "#00FFFF", false, "#00AAAA")), M.setValue("SCORE: " + w), (R = M.render()), (G = w));
                    T || ((T = new generateBrushTable(15 * q, "#00FFFF", false, "#00AAAA")), T.setValue("TALK"), (ga = T.render()));
                    m.save();
                    m.scale(q, q);
                    if (0 < Ja) {
                        var qa = snake.talkStamina / 255;
                        255 == snake.talkStamina && 255 > Y && (s.localStorage.talk ? s.localStorage.talk++ : (s.localStorage.talk = 1), 7 >= s.localStorage.talk && 0 == s.localStorage.talk % 2 && I.showTip("Press T to talk", 4e3));
                        Y = snake.talkStamina;
                        m.globalAlpha = 1 == qa ? 0.3 : 0.1 + 0.6 * $;
                        var dc = canvas.height / q - P.height - R.height - ga.height - 5;
                        m.drawImage(ga, 5, dc);
                    }
                    m.globalAlpha = 0.3;
                    m.drawImage(P, 5, canvas.height / q - P.height - R.height - 5);
                    m.drawImage(R, 5, canvas.height / q - P.height - 5);
                    0 < Ja && this.drawTalkWaitFx(m, ga.width + 5 + 8, dc + 13, 4, qa);
                    m.globalAlpha = 1;
                    m.restore();
                }
                J && ((u = x.createElement("canvas")), (k = u.getContext("2d")), this.renderLeaderboard(k, u), (J = false));
                u && isInGame && this.drawLeaderboard(m);
                y &&
                    ((0 < Ka && ya) || !ya || 0 < E) &&
                    (null == D && ((k = parseInt(20 * q) + 1), (z = new generateBrushTable(k, F, false, F)), z.setValue(y), z.setUsingRoundedFrame(true), z.setRoundedFrameStyle(A), z.setShadowBlur(2), (D = z.render())),
                    m.drawImage(D, ea / 2 - D.width / 2, 1.1 * D.height * (X ? 1 - E / 300 : E / 300) - D.height));
                !OverlayVisible && 0 < Ja && ja.draw(m);
                a != q && (a = q);
            };
            this.drawTalkWaitFx = function (b, a, e, d, l) {
                var g = -Math.PI / 2;
                l = 2 * Math.PI * l + g;
                b.beginPath();
                b.lineWidth = 2 * d;
                b.arc(a, e, d, 0, 2 * Math.PI, false);
                b.strokeStyle = "#00FFFF";
                b.globalAlpha = 0.1;
                b.stroke();
                b.beginPath();
                b.arc(a, e, d, g, l, false);
                b.globalAlpha = 0.6;
                b.stroke();
            };
            this.update = function (b) {
                0 < E ? ((E -= b), 0 >= E && !X && (y = null)) : (E = 0);
                ya && (Ka -= b);
                ya && 0 >= E && X && 0 >= Ka && ((X = false), (E = 300));
                0 < $ && (($ -= b / 500), 0 > $ && ($ = 0));
            };
            this.renderLeaderboard = function (b, a) {
                function e(a) {
                    n += c + l;
                    a = b.measureText(formatName(a)).width;
                    ib < a && (ib = a);
                }
                m = 230;
                n = 0;
                var d = 5 * q,
                    l = 10 * q,
                    g = 23 * q,
                    c = 18 * q,
                    f,
                    r = 0 * q,
                    v = 5 * q;
                n += d + g + d + 12;
                f = 6 + d + g + d;
                for (var h = C.length, ib = 0, jb = false, Q = 0; Q < h; Q++) {
                    var K = C[Q];
                    K && (Z != K.id || jb || (jb = true), e(K.nick.substring(0, 16)));
                }
                !jb && snake && e(snake.nick);
                ib > r && (m += ib - r);
                k = m * q;
                a.width = k;
                a.height = n;
                b.fillStyle = "#003a3a";
                b.globalAlpha = 0.3;
                Ra(b, 6, 6, k - 12, n - 12, 15 * q);
                b.globalAlpha = 1;
                b.shadowColor = "#337777";
                b.shadowBlur = 6;
                b.fillStyle = "#337777";
                b.globalAlpha = 0.5;
                mc(b, 6, 6, k - 12, 32 * q, 15 * q);
                b.globalAlpha = 1;
                b.font = g + "px 'proxima-nova-1','proxima-nova-2', Arial Black";
                b.textBaseline = "middle";
                r = b.measureText("LEADERBOARD").width;
                b.fillStyle = "#09ffff";
                b.shadowColor = "#09ffff";
                b.shadowBlur = 6;
                b.fillText("LEADERBOARD", k / 2 - r / 2, d + 6 + g / 2);
                b.shadowBlur = 2;
                g = c + "px 'proxima-nova-1','proxima-nova-2', Arial Black";
                b.font = g;
                f += v;
                for (Q = 0; Q < h; Q++)
                    if ((K = C[Q])) {
                        var v = 0 == Q && 0 < pa,
                            u,
                            J = Q + 1 + ". ";
                        v && ((u = b.measureText(J).width), (J += "    "));
                        var J = J + formatName(K.nick),
                            A = 0;
                        b.fillStyle = Z == K.id ? "#09ffff" : "rgba(0,255,255,0.4)";
                        b.font = g;
                        r = b.measureText(J).width;
                        b.fillText(J, 6 + d, f + A + c / 2);
                        r = b.measureText(K.score).width;
                        b.fillText(K.score, k - d - r - 6, f + A + c / 2);
                        v && (b.save(), b.translate(6 + d + u + 10, f + A + c / 2 - 1), (K = 1), HighGraphicsEnabled || (K = 0.5), b.scale(0.8 * K, 0.8 * K), t.frames.crown.draw(b), b.restore());
                        f += c + l;
                    }
                !jb && snake && ((b.fillStyle = "#09ffff"), (J = qa + ". " + formatName(snake.nick)), (r = b.measureText(J).width), b.fillText(J, 6 + d, f + A + c / 2), (r = b.measureText(w).width), b.fillText(w, k - d - r - 6, f + A + c / 2));
            };
            this.drawLeaderboard = function (b) {
                b.drawImage(u, ea - k - 5, 5);
            };
            this.addMessage = function (b, a, e) {
                c = b;
                g = null;
                f = e;
                d = +new Date();
                h = a;
            };
            this.addSpecialMessage = function (a, e) {
                l = a;
                b = null;
                r = +new Date();
                v = e;
            };
            this.refreshLeaderboard = function (b) {
                C = b;
                J = true;
            };
            this.showTip = function (b, a, e, d) {
                y && this.clearTip();
                y = b;
                Ka = a;
                ya = 0 < a;
                D = null;
                E = 300;
                X = true;
                e ? ((F = e), (A = d)) : ((F = "#00FFFF"), (A = "#006666"));
            };
            this.clearTip = function () {
                X = false;
                E = 300;
            };
            this.updateRank = function (b, a) {
                qa = b;
                w = a;
            };
            this.cantTalk = function () {
                $ = 1;
            };
            this.toggleTalkLayer = function () {
                ja.visible = ja.visible ? false : true;
            };
            this.hideTalkLayer = function () {
                ja.visible = false;
            };
            this.fastHideTalkLayer = function () {
                ja.fastHide();
            };
            ja = new tc();
        },
        Cb = function () {
            var a = this;
            this.snake = true;
            this.killReason = 0;
            this.id = -1;
            this.lastServerY = this.lastServerX = this.dstY = this.dstX = this.origY = this.origX = this.prevY = this.prevX = this.y = this.x = 0;
            this.points = [];
            this.renderedPoints = [];
            this.pointServerFix = [];
            this.curLengthDst = this.curLength = 0;
            this.direction = 1;
            this.hue = 0;
            this.attached = true;
            this.inside = this.still = this.decay = this.shock = this.invulnerable = this.attracting = false;
            this.nick = "";
            this.lastUpdateTime;
            this.highlightSin = this.highlightTime = 0;
            this.beingDeleted = this.redTone = false;
            this.snakeScale = 1;
            this.killedByID = 0;
            var c = 1;
            this.locatorValue = 0;
            Ua++;
            var f = false,
                d = 0,
                h = 0,
                g = 0,
                e = 0,
                b = 0,
                l = 0,
                r = 0,
                v = false,
                J,
                C = {},
                u = {},
                m,
                k,
                n = 99,
                q = false,
                x,
                L,
                M,
                ya,
                E,
                X,
                F = 0,
                A = [],
                qa = [],
                w = 0,
                H = 0,
                G = 1,
                O = 0;
            this.lastSpeed = 0;
            this.waitingPoints = [];
            var S = 0,
                da = 0;
            this.headPos = void 0;
            this.shiftLen = 0;
            var ea = [];
            this.tutorial = false;
            var ca = 0,
                ga,
                $,
                V,
                ja = 0.4,
                na = 0;
            this.playSounds = true;
            var ha = false,
                ka = false,
                W = 0,
                la = 0,
                ia = 0,
                fa = false,
                ma = "",
                ta = 0,
                ba = 0,
                ra = 0;
            this.talkStamina = 0;
            this.processPoint = function (b) {
                this.setTurnPoint(b.d, b.x, b.y);
                S--;
                this.waitingPoints.splice(0, 1);
                var a = ua(this.x, this.y, b.x, b.y),
                    e = getDirectionVector(b.d);
                this.x = b.x + e.x * a;
                this.y = b.y + e.y * a;
                0 < S && ((e = this.waitingPoints[0]), (b = ua(e.x, e.y, b.x, b.y)), a > b && this.processPoint(e));
            };
            this.update = function (a) {
                if (this.beingDeleted) { //Deletes the actual snake and sounds
                    if (q) (this.snakeScale -= 0.1), 0 > this.snakeScale && (this.id == Z && ((mySnake.direction = 1), (Z = 0), (snake = null), (killReason = this.killReason), this.killedByID == this.id && (killReason = 3)), delete y[this.id], this.cleanup());
                    else {
                        var c = ua(this.x + u.x, this.y + u.y, C.x, C.y);
                        c > n ? ((q = true), this.points.unshift({ x: this.x, y: this.y }), (this.x = C.x), (this.y = C.y)) : ((this.x += u.x), (this.y += u.y));
                        n = c;
                        ca += a;
                        3e3 < ca && !q && (debug && console.log("bf"), (q = true));
                    }
                }
                else {
                    k = m;
                    m = mb((P - this.lastUpdateTime) / OneHundred, 0, 1);
                    if (k == m) return;
                    this.prevX = this.x;
                    this.prevY = this.y;
                    var Q = (c = 0),
                        c = m * (this.dstX - this.origX) + this.origX,
                        Q = m * (this.dstY - this.origY) + this.origY;
                    Math.atan((this.dstY - this.origY) / (this.dstX - this.origX));
                    this.x = c;
                    this.y = Q;
                    c = this.x - this.prevX;
                    Q = this.y - this.prevY;
                    if (0 < S) {
                        var K = this.waitingPoints[0];
                        ua(this.x, this.y, K.x, K.y);
                        var J = false;
                        if (1 == this.direction || 3 == this.direction) {
                            if ((this.prevY <= K.y && this.y >= K.y) || (this.y <= K.y && this.prevY >= K.y)) J = true;
                        } else if ((this.prevX <= K.x && this.x >= K.x) || (this.x <= K.x && this.prevX >= K.x)) J = true;
                        J && this.processPoint(K);
                    }
                    c = Math.abs(c);
                    Q = Math.abs(Q);
                    L = x;
                    x = c > Q ? c : Q;
                    c = m * (b - g) + g;
                    Q = m * (l - e) + e;
                    d = c;
                    h = Q;
                }
                this.curLength += (this.curLengthDst - this.curLength) / 10;
                E && this.headPos && E.setPosition(this.headPos.x, this.headPos.y);
                E && E.update(a);
                30 < r || v ? E.enabled || E.setEnabled(true) : 30 >= r && E.enabled && E.setEnabled(false);
                this.playSounds && (na = Ob(this.x, this.y));
                T ? OverlayVisible && (na *= 0.3) : (na = 0);
                ga && this.playSounds && ((ja -= 0.01), 0 > ja && (ja = 0), (D.sound._nodeById(ga).bufferSource.playbackRate.value = 0.8 + (r / 100) * 1.5 - ja), D.sound.volume((ec + (r / 100) * (vc - ec)) * na * R, ga));
                $ && this.playSounds && ((c = Math.max(0, (r - 30) / 70)), D.sound.volume(c * wc * na * R, $));
                V && this.playSounds && (D.sound._nodeById(V), ha ? D.sound.volume(xc * na * R, V) : D.sound.volume(0, V));
                f && !wa && isInGame && snake == this && ((ia += a), 2e3 < ia && ((wa = 1), (s.localStorage.speedUpTut = 1)));
                a = (a / 1e3) * 20;
                0 < ba ? ((ra += a), (a = 0.75 * Math.PI), ra > a && (ra = a)) : ((ra -= a), 0 > ra && (ra = 0));
            };
            this.drawCircle = function (b, a, e, d, l) {
                b.beginPath();
                b.arc(a, e, l, 0, 2 * Math.PI, false);
                b.fillStyle = d;
                b.fill();
            };
            this.drawSpark = function (b, a, e, d, l, g) {
                A[l] && (g.save(), (g.globalAlpha = c), g.translate(b, a), g.rotate(e), g.scale(d, d), g.translate(0, -(A[l].height / 2)), A[l].draw(g), g.restore());
            };
            this.drawTail = function (b, a) {
                var e = b.length,
                    d = b[0].x,
                    l = b[0].y;
                a.beginPath();
                a.moveTo(d, l);
                for (d = 1; d < e; d++) a.lineTo(b[d].x, b[d].y);
                a.stroke();
            };
            this.getWidth = function () {
                var b = this.curLength - pb,
                    b = b / 1e3 + 2.5;
                8 < b && (b = 8);
                return b * (5 - 4 * this.snakeScale);
            };
            this.getPointList = function (b) {
                for (var a = this.points.length, e = this.x, d = this.y, l = 0, g = b.length, c = b[0], f = [], r = 0; r < a; r++) {
                    p = this.points[r];
                    var v = ua(e, d, p.x, p.y),
                        l = l + v;
                    if (l > c) {
                        var h = l - c,
                            c = e - p.x,
                            u = d - p.y,
                            h = Math.sqrt(c * c + u * u) - h,
                            c = Pa(c, u);
                        c.x *= h;
                        c.y *= h;
                        f.push({ x: e - c.x, y: d - c.y });
                        l -= v;
                        r--;
                        g--;
                        b.splice(0, 1);
                        c = b[0];
                        if (0 == g) break;
                        else continue;
                    }
                    e = p.x;
                    d = p.y;
                }
                return f;
            };
            this.calcRenderPoints = function () {
                var b = [],
                    a = this.points.length,
                    e = 0,
                    d = this.x,
                    l = this.y,
                    c = 0,
                    g = { x: this.x, y: this.y };
                Z == this.id || this.tutorial || (c = (Math.max(Wa / 2 + da / 2 - db + Zb, 0) * this.lastSpeed) / OneHundred);
                for (var f = false, r, v = 0; v < a; v++) {
                    r = this.points[v];
                    var h = ua(d, l, r.x, r.y),
                        e = e + h;
                    if (f)
                        if (e > this.curLength) {
                            f = e - this.curLength;
                            e = d - r.x;
                            r = l - r.y;
                            h = Math.sqrt(e * e + r * r);
                            f = h - f;
                            r = Pa(e, r);
                            r.x *= f;
                            r.y *= f;
                            b.push({ x: d - r.x, y: l - r.y });
                            break;
                        } else b.push({ x: r.x, y: r.y });
                    else if (e > c) {
                        f = e - c;
                        e = d - r.x;
                        r = l - r.y;
                        h = Math.sqrt(e * e + r * r);
                        f = h - f;
                        r = Pa(e, r);
                        r.x *= f;
                        r.y *= f;
                        d -= r.x;
                        l -= r.y;
                        b.push({ x: d, y: l });
                        g.x = d;
                        g.y = l;
                        e = 0;
                        f = true;
                        v--;
                        continue;
                    }
                    d = r.x;
                    l = r.y;
                }
                0 == b.length && b.push({ x: 0, y: 0 });
                this.headPos = g;
                this.renderedPoints = b;
                this.shiftLen = c;
            };
            this.drawAfter = function (b) {
                var a = 50;
                this.beingDeleted && (a = 100);
                fa && (a = 100);
                var a = "hsl(" + this.hue + ", 100%, " + a + "%)",
                    e = this.getWidth();
                G = e / 2.5;
                1 < G && (G = 1 + 0.6 * (G - 1));
                this.calcRenderPoints();
                ha = false;
                var l = (100 - r) / 30;
                if (f && this.headPos) {
                    if (0 < w) {
                        var g = y[w];
                        if (g) {
                            var v = g.getWidth() / 2 + 0.1,
                                u = this.headPos.x - d,
                                m = this.headPos.y - h,
                                A = Math.atan2(m, u),
                                k = A + Math.PI / 2,
                                C = Math.sin(-k),
                                n = Math.cos(-k),
                                C = C * v,
                                n = n * v,
                                s = d - C,
                                v = h - n,
                                u = this.headPos.x - s,
                                m = this.headPos.y - v,
                                s = (this.headPos.x + s) / 2,
                                q = (this.headPos.y + v) / 2,
                                v = parseInt,
                                X;
                            X = 3 * Math.random() + 0;
                            v = v(X);
                            u = Math.sqrt(u * u + m * m);
                            0 == F &&
                                5 <= u &&
                                (b.save(),
                                (b.globalAlpha = c),
                                b.translate(s, q),
                                b.rotate(A + Math.PI / 2),
                                (A = u / t.frames.lightning1.height),
                                (m = Math.random()),
                                (q = s = 1),
                                0.25 > m ? (s = -1) : 0.5 > m ? (q = -1) : 0.75 > m && (q = s = -1),
                                b.scale(A * s, A * q),
                                qa[v].draw(b),
                                b.restore());
                            A = false;
                            if (2 > l || 20 >= u) ha = A = true;
                            m = Math.max(0.2, Math.min(0.5, 1 - u / 40)) + 0;
                            40 < r && (m += ((r - 40) / 60) * 0.3);
                            A && g.drawSpark(d - C, h - n, k, m, v, b);
                            5 > u && g.drawSpark(d + C, h + n, k, -m, v, b);
                        }
                    }
                    F++;
                    2 > l && (l = 2);
                    F > l && ((F = 0), this.playSounds && D.playSound(yc, zc * na * R, 1, sa, null));
                }
                HighGraphicsEnabled && ((b.shadowColor = a), (b.shadowBlur = 5));
                b.save();
                b.globalAlpha = 1 * c;
                b.beginPath();
                b.lineWidth = e * this.snakeScale;
                b.lineCap = "round";
                b.lineJoin = "round";
                b.strokeStyle = a;
                a = 60;
                this.beingDeleted && (a = 100);
                fa && ((a = 100), (b.lineWidth = (e + 1) * this.snakeScale));
                b.strokeStyle = "hsl(" + this.hue + ", 100%, " + a + "%)";
                HighGraphicsEnabled && (b.shadowBlur = 15);
                this.drawTail(this.renderedPoints, b);
                fa && ((b.lineWidth = e * this.snakeScale), (b.strokeStyle = "hsl(0, 100%, 0%)"), this.drawTail(this.renderedPoints, b));
                4e3 < this.curLength &&
                    HighGraphicsEnabled &&
                    ((a = 1),
                    4500 > this.curLength && (a = 1 - (4500 - this.curLength) / 500),
                    (b.globalAlpha = a * c),
                    (b.shadowBlur = 5),
                    (b.lineWidth = (e - 2) * this.snakeScale),
                    (a = "hsl(" + this.hue + ", 100%, 90%)"),
                    (b.strokeStyle = a),
                    (b.shadowColor = a),
                    (a = (e / 4) * 1.5),
                    b.setLineDash([10 * a, 12 * a]),
                    (tt = 15 * G),
                    (b.lineDashOffset = tt),
                    this.drawTail(this.renderedPoints, b),
                    (b.globalAlpha = 1));
                10 < r &&
                    ((a = (r - 10) / 50),
                    50 < r && (a = 1),
                    (b.globalAlpha = a * c),
                    (b.shadowBlur = 0),
                    (b.strokeStyle = "hsl(" + this.hue + ", 100%, 90%)"),
                    (b.lineWidth = (e - 0.8) * this.snakeScale),
                    this.drawTail(this.renderedPoints, b),
                    (b.globalAlpha = 1 * c));
                b.shadowBlur = 0;
                b.translate(this.headPos.x, this.headPos.y);
                30 < r && ((e = (r - 30) / 70), 0 == H && (e *= 0.5), (b.globalAlpha = 0.4 * e * c), b.scale(0.9, 0.9), ya.draw(b), b.scale(1 / 0.9, 1 / 0.9), (b.globalAlpha = 1 * c));
                5 < r && ((e = (r - 5) / 50), 50 < r && (e = 1), (e *= 0.6), b.scale(e, e), M.draw(b), (b.globalAlpha = 1 * c), b.scale(1 / e, 1 / e), H++, 2 < H && (H = 0));
                e = this.snakeScale * G;
                b.scale(0.21 * e, 0.21 * e);
                J.draw(b);
                b.restore();
                b.shadowBlur = 0;
                b.globalAlpha = 0.7 * c;
                a = this.getPointList([2.5 * e + this.shiftLen, 5 * e + this.shiftLen, 7.5 * e + this.shiftLen, 8.5 * e + this.shiftLen]);
                4 == a.length &&
                    (b.save(),
                    (l = a[0]),
                    b.translate(l.x, l.y),
                    b.scale(0.19 * e, 0.19 * e),
                    J.draw(b),
                    b.restore(),
                    (b.globalAlpha = 0.5 * c),
                    b.save(),
                    (l = a[1]),
                    b.translate(l.x, l.y),
                    b.scale(0.16 * e, 0.16 * e),
                    J.draw(b),
                    b.restore(),
                    (b.globalAlpha = 0.3 * c),
                    b.save(),
                    (l = a[2]),
                    b.translate(l.x, l.y),
                    b.scale(0.12 * e, 0.12 * e),
                    J.draw(b),
                    b.restore(),
                    (b.globalAlpha = 0.1 * c),
                    b.save(),
                    (l = a[3]),
                    b.translate(l.x, l.y),
                    b.scale(0.12 * e, 0.12 * e),
                    J.draw(b),
                    b.restore());
                b.globalAlpha = 1 * c;
                E && ((E.alpha = 1 * c), E.draw(b));
                b.globalAlpha = 1;
            };
            this.draw = function (b) {};
            this.drawInput = function (b) {};
            this.drawKillStreakIcon = function (b, a) {
                var e = 0;
                8 <= a && 13 > a ? (e = 0) : 13 <= a && 18 > a ? (e = 1) : 18 <= a && 23 > a ? (e = 2) : 23 <= a && (e = 3);
                var d;
                d = ((a - 8) / 22) * 0.8;
                0.8 < d && (d = 0.8);
                d = 1 + d;
                b.scale(d, d);
                b.translate(0, -4 * d);
                t.frames.skullback.draw(b);
                0 == e
                    ? (t.frames.skullbase.draw(b), t.frames.skullglow.draw(b), 8 < a && t.frames.skulleyesred.draw(b))
                    : 1 == e
                    ? (t.skullDarkBlue.draw(b), t.skullDarkBlueGlow.draw(b), t.frames.skulleyesyellow.draw(b))
                    : 2 == e
                    ? (t.skullPurple.draw(b), t.skullPurpleGlow.draw(b), t.frames.skulleyesgreen.draw(b))
                    : 3 == e && (t.skullRed.draw(b), t.skullRedGlow.draw(b), t.frames.skulleyesblue.draw(b));
                t.frames.skullgradient.draw(b);
                b.fillStyle = "rgba(0, 200, 255, 1.0)";
                b.font = "Bold 18px 'proxima-nova-1','proxima-nova-2', Arial";
                b.shadowBlur = 5;
                b.shadowColor = "rgba(0, 200, 255, 1.0)";
                e = b.measureText(a).width;
                b.fillText(a, -e / 2, -30);
                b.shadowBlur = 0;
                b.scale(1 / d, 1 / d);
            };
            this.drawInfo = function (b) {
                if (void 0 != this.headPos && !this.beingDeleted) {
                    b.save();
                    b.globalAlpha = c;
                    b.translate(this.headPos.x, this.headPos.y);
                    var e = 20,
                        d = 0.5 * (G - 1) + 1,
                        l = 0.55 * d;
                    this.id == pa && (b.translate(0, -e * d), b.scale(l, l), t.frames.crown.draw(b), b.scale(1 / l, 1 / l), b.translate(0, e * d), (e += 20));
                    ka && ((l = 0.45 * d), b.translate(0, -e * d), b.scale(l, l), t.frames.trophy.draw(b), b.scale(1 / l, 1 / l), b.translate(0, e * d), (e += 20));
                    0 < W && ((l = 0.35 * d), b.translate(0, -e * d), b.scale(l, l), this.drawKillStreakIcon(b, W), b.scale(1 / l, 1 / l), b.translate(0, e * d));
                    b.globalAlpha = 0.85 * c;
                    b.fillStyle = "rgba(255, 255, 255, 0.6)";
                    b.font = "Bold 10px 'proxima-nova-1','proxima-nova-2', Arial";
                    b.textBaseline = "hanging";
                    e = a.nick.substring(0, 16);
                    d = b.measureText(e).width;
                    b.fillText(e, -d / 2, 30);
                    b.restore();
                    0 < ra &&
                        (b.save(),
                        (b.globalAlpha = 1),
                        b.translate(this.headPos.x, this.headPos.y),
                        (e = Math.sin(ra)),
                        (d = Math.sin(0.75 * Math.PI)),
                        e > d && (e = d + 0.5 * (1 - d)),
                        b.scale(e, e),
                        (b.fillStyle = "rgba(0, 60, 60, 1.0)"),
                        (b.font = "Bold 8px 'proxima-nova-1','proxima-nova-2', Arial"),
                        (b.textBaseline = "hanging"),
                        (e = b.measureText(ma).width),
                        (d = e / 2 + 13),
                        (l = e + 8),
                        b.beginPath(),
                        b.moveTo(-4, -4),
                        b.lineTo(-27, -20),
                        b.lineTo(-13, -20),
                        b.closePath(),
                        b.fill(),
                        Ra(b, -l / 2 - d, -24.5, l, 13, 6),
                        (b.fillStyle = "rgba(0, 255, 255, 1.0)"),
                        b.fillText(ma, -e / 2 - d, -20),
                        b.restore());
                }
            };
            this.updateNetwork = function (a, c, u) {
                var m, k;
                m = 10 * a.getFloat32(c, true);
                c += 4;
                k = 10 * -a.getFloat32(c, true);
                c += 4;
                this.lastServerX = m;
                this.lastServerY = k;
                this.lastSpeed = 30 * a.getFloat32(c, true);
                c += 4;
                this.curLengthDst = 10 * a.getFloat32(c, true);
                c = c + 4 + 1;
                curPointCount = a.getUint16(c, true);
                c += 2;
                0 == S && 0 >= O
                    ? ((this.origX = this.x), (this.origY = this.y), (this.dstX = m), (this.dstY = k))
                    : ((this.origX = this.x), (this.origY = this.y), (m = getDirectionVector(this.direction)), (this.dstX += m.x * this.lastSpeed), (this.dstY += m.y * this.lastSpeed));
                k = a.getUint8(c, true);
                c += 1;
                if (k & 1) {
                    a.getFloat32(c, true);
                    c += 4;
                    a.getFloat32(c, true);
                    c += 4;
                    a.getFloat32(c, true);
                    c += 4;
                    a.getFloat32(c, true);
                    c += 4;
                    a.getFloat32(c, true);
                    c += 4;
                    a.getFloat32(c, true);
                    c += 4;
                    a.getFloat32(c, true);
                    c += 4;
                    a.getFloat32(c, true);
                    c += 4;
                    var C = a.getUint16(c, true);
                    c += 2;
                    ea = [];
                    for (m = 0; m < C; m++) {
                        var F = a.getFloat32(c, true);
                        c += 4;
                        var n = -a.getFloat32(c, true);
                        c += 4;
                        ea.push({ x: 10 * F, y: 10 * n });
                    }
                }
                k & 2
                    ? ((m = a.getFloat32(c, true)), (c += 4), (C = -a.getFloat32(c, true)), (c += 4), (w = a.getUint16(c, true)), (c += 2), (g = d), (e = h), (b = 10 * m), (l = 10 * C), f || ((d = b), (h = l), (g = b), (e = l), (f = true)))
                    : (f = false);
                v = k & 4 ? true : false;
                k & 8 && ((da = a.getUint16(c, true)), (c += 2));
                ka = k & 16;
                k & 32 ? ((W = a.getUint16(c, true)), (c += 2), la != W && snake == this && isInGame && ((la = W), I.addSpecialMessage(W + " PLAYER KILL STREAK", 25))) : (W = 0);
                k & 64 ? ((ba = a.getUint8(c, true)), (c += 1), ta != ba && ((ma = this.getTalkTextByTalkID(ba)), (ta = ba))) : (ba = 0);
                this.talkStamina = a.getUint8(c, true);
                c += 1;
                r = (a.getUint8(c, true) / 255) * 100;
                c += 1;
                snake == this && ((m = Math.max(0, Math.min(1, (this.curLengthDst - pb) / Ub))), (wb = Ta - (Ta - Tb) * m));
                if (u) {
                    "demogorgon" == this.nick && (fa = true);
                    this.origX = this.dstX;
                    this.origY = this.dstY;
                    this.x = this.dstX;
                    this.y = this.dstY;
                    this.curLength = this.curLengthDst;
                    this.points = [];
                    for (m = 0; m < curPointCount; m++) (u = a.getFloat32(c, true)), (c += 4), (k = -a.getFloat32(c, true)), (c += 4), this.points.push({ x: 10 * u, y: 10 * k });
                    this.hue = a.getUint16(c, true);
                    c += 2;
                    a.getUint8(c);
                    c += 1;
                    X = "hsl(" + this.hue + ", 100%, 50%)";
                    a = "hsl(" + this.hue + ", 100%, 90%)";
                    m = "hsl(" + this.hue + ", 100%, 70%)";
                    J = t.frames.head_dot.renderTintedFrame("#FFFFFF");
                    M = t.frames.glow.renderTintedFrame(X);
                    ya = t.frames.glow_hard.renderTintedFrame(a);
                    qa.push(t.frames.lightning1.renderTintedFrame(X));
                    qa.push(t.frames.lightning2.renderTintedFrame(X));
                    qa.push(t.frames.lightning3.renderTintedFrame(X));
                    A.push(t.frames.spark0.renderTintedFrame(m));
                    A.push(t.frames.spark1.renderTintedFrame(m));
                    A.push(t.frames.spark2.renderTintedFrame(m));
                    a = t.frames.particleDot.renderTintedFrame("hsl(" + this.hue + ", 100%, 80%)");
                    E = new fc();
                    E.particleFrame = a;
                    E.init(10, this.x, this.y);
                    this.playSounds &&
                        (D.playSound(Ac, 0, 1, sa, function (b) {
                            ga = b;
                        }),
                        D.playSound(Bc, 0, 1, sa, function (b) {
                            $ = b;
                        }),
                        D.playSound(Cc, 0, 1, sa, function (b) {
                            V = b;
                        }));
                } else if (((u = a.getUint8(c, true)), c++, 0 < u)) {
                    k = [];
                    for (m = 0; m < u; m++) (C = a.getFloat32(c, true)), (c += 4), (F = -a.getFloat32(c, true)), (c += 4), k.push({ x: 10 * C, y: 10 * F });
                    if (this.id == Z && Ab) {
                        a = Math.min(O, u);
                        0 > a && (a = 0);
                        C = u - O;
                        for (m = 0; m < a; m++) void 0 != k[m + C] && (this.points[m] = k[m + C]);
                        for (m = 0; m < u - a; m++) this.pointServerFix.unshift(k[m]);
                        O -= u;
                    } else {
                        for (m = u - 1; 0 <= m; m--) this.points.unshift(k[m]);
                        this.playSounds && D.playSound(gc, hc * na * R, 1, sa, null);
                    }
                }
                a = O;
                0 > a && (a = 0);
                a = curPointCount + a;
                a < this.points.length && this.points.splice(a + 1, this.points.length - a - 1);
                this.lastUpdateTime = P;
                return c;
            };
            this.fixPoints = function (b, a, e) {
                var d = ua(a, e, this.dstX, this.dstY),
                    c = ua(this.origX, this.origY, a, e);
                b = getDirectionVector(b);
                var l = b.y * d;
                this.dstX = a + b.x * d;
                this.dstY = e + l;
                d = b.y * c;
                this.origX = a - b.x * c;
                this.origY = e - d;
            };
            this.setTurnPoint = function (b, a, e) {
                O++;
                0 < this.pointServerFix.length && ((a = this.pointServerFix[0].x), (e = this.pointServerFix[0].y), this.pointServerFix.splice(0, 1));
                this.points.unshift({ x: a, y: e });
                this.direction = this.pendingDirection = b;
                this.fixPoints(b, a, e);
                this.playSounds && D.playSound(gc, hc * na * R, 1, sa, null);
            };
            this.findLastWaitingPoint = function (b) {
                console.log(S, "The misterious counting thingy");
                for (var a = this.x, e = this.y, d = 0, c = 0; c < S; c++) (b = this.waitingPoints[c]), (d += ua(a, e, b.x, b.y)), (a = b.x), (e = b.y), (b = b.d);
                return { x: a, y: e, dist: d, direction: b };
            };
            this.addTurnPoint = function (b, a, is_zero, is_jump) {
                console.log(a, Wa, "what is this?");
                console.log(this.points);
                300 < Wa && (a += Wa - 300);
                //7.5 is the "normal" speed
                var e = (a*7.5/** this.lastSpeed*/) / OneHundred,
                    d = this.findLastWaitingPoint(this.direction),
                    c = is_zero ? 0 : (is_jump? 10000: e - d.dist),
                    l = getDirectionVector(d.direction),
                    e = d.x + l.x * c,
                    d = d.y + l.y * c;
                S++;
                this.waitingPoints.push({ x: e, y: d, d: b });
                return { x: e / 10, y: d / 10 };
            };
            this.deleteNetwork = function (b, a) {
                this.id == Z && 4 <= killCount + 1 && ((cb = this.killedByID), (xa = 30));
                this.killedByID == Z && this.id == pa && this.id != Z && isInGame && I.addSpecialMessage("YOU KILLED THE KING!", 30);
                if (gameInFocus && 0 != this.killReason) {
                    this.beingDeleted = true;
                    this.id == Z && z.shake(7 + 0.13 * r);
                    var e = b.getFloat32(a, true);
                    a += 4;
                    var d = -b.getFloat32(a, true);
                    a += 4;
                    3 == this.killReason ? (q = true) : ((C.x = 10 * e), (C.y = 10 * d), (u.x = this.x - this.prevX), (u.y = this.y - this.prevY), (u = Pa(u.x, u.y)), (u.x *= L), (u.y *= L));
                    this.playSounds && D.playSound(Dc, Ec * na * R, 1.1, sa, null);
                } else this.id == Z && ((mySnake.direction = 1), (Z = 0), (snake = null), (killReason = this.killReason)), (a = a + 4 + 4), delete y[this.id], this.cleanup();
                return a;
            };
            this.resume = function () {};
            this.cleanup = function () {
                Ua--;
                ga && this.playSounds && (D.sound.stop(ga), D.sound.stop($), D.sound.stop(V), ($ = ga = null));
            };
            this.setKilledBy = function (b) {
                this.killedByID = b;
            };
            this.setDead = function () {
                q = true;
            };
            this.setRubSnakeID = function (b) {
                w = b;
            };
            this.setAlpha = function (b) {
                c = b;
            };
            this.onBlur = function () {
                this.playSounds && (D.sound.volume(0, ga), D.sound.volume(0, $), D.sound.volume(0, V));
            };
            this.getTestValue = function () {
                return 7;
            };
            this.getTalkTextByTalkID = function (b) {
                return $b[b - 1];
            };
            this.canTalk = function () {
                return 255 == this.talkStamina;
            };
        },
        ic = function () {
            this.id = -1;
            this.dstY = this.dstX = this.origY = this.origX = this.prevY = this.prevX = this.y = this.x = 0;
            this.energy = 255;
            this.nick = "";
            this.hue = 0;
            this.lastUpdateTime;
            var a = (this.killedByID = 0),
                c,
                f,
                d = 0;
            this.canInterpolate = this.beingDeleted = false;
            var h = (this.beginGraby = this.beginGrabX = this.killedByID = this.blendIn = 0),
                g = Math.random() * Math.PI,
                e = 0.5 < Math.random() ? 1 : -1,
                b = 0,
                l = 1;
            this.playSounds = true;
            this.tutorial = false;
            this.update = function (a) {
                a *= 0.06;
                if (this.beingDeleted) {
                    var e = y[this.killedByID];
                    if (e) {
                        var c = Math.pow(d, 2),
                            l;
                        l = e.x;
                        e = e.y;
                        this.x = this.beginGrabX + (l - this.beginGrabX) * c;
                        this.y = this.beginGrabY + (e - this.beginGrabY) * c;
                    }
                    d += 0.07 * a;
                    1 < d && delete y[this.id];
                } else
                    1 > b && ((b += 0.03 * a), 1 < b && (b = 1)),
                        (a = mb((P - this.lastUpdateTime) / OneHundred, 0, 1)),
                        (this.prevX = this.x),
                        (this.prevY = this.y),
                        (c = a * (this.dstY - this.origY) + this.origY),
                        (this.x = a * (this.dstX - this.origX) + this.origX),
                        (this.y = c);
                this.beingDeleted && (h += 0.2);
            };
            this.drawAfter = function (b) {};
            this.draw = function (c) {
                c.save();
                c.translate(this.x, this.y);
                a += 0.05;
                var v = 0.2 - 0.02 * Math.sin(a),
                    k = 0.2 - 0.02 * Math.sin(a),
                    C = 0.75 * Math.PI,
                    C = Math.sin(Math.sqrt(b) * C) / 0.75;
                c.scale(v * C, k * C);
                c.rotate((Math.PI / 4 + a / 15 + g + 2 * b) * e);
                this.beingDeleted && (c.rotate(h), 0 < this.killedByID ? c.scale(1.7, 1.7) : c.scale(1 - d, 1 - d));
                c.globalAlpha = l;
                f.draw(c);
                c.globalAlpha = 1;
                c.restore();
            };
            this.drawInput = function (b) {};
            this.drawInfo = function (b) {};
            this.updateNetwork = function (b, a, e) {
                var d, l;
                d = b.getFloat32(a, true);
                a += 4;
                l = -b.getFloat32(a, true);
                a += 4;
                this.origX = this.x;
                this.origY = this.y;
                this.dstX = 10 * d;
                this.dstY = 10 * l;
                e
                    ? ((this.origX = this.dstX),
                      (this.origY = this.dstY),
                      (this.x = this.dstX),
                      (this.y = this.dstY),
                      (this.hue = b.getUint16(a, true)),
                      (a += 2),
                      (c = "hsl(" + this.hue + ", 100%, 50%)"),
                      (f = t.frames.food.renderTintedFrame(c)))
                    : (this.canInterpolate = true);
                this.lastUpdateTime = P;
                return a;
            };
            this.deleteNetwork = function (b, a) {
                gameInFocus
                    ? ((this.beingDeleted = true),
                      (this.beginGrabX = this.x),
                      (this.beginGrabY = this.y),
                      0 < this.killedByID && this.playSounds && ((lastDistVolume = Ob(this.x, this.y)), D.playSound(Fc, Gc * lastDistVolume * R, 1.5, sa, null)))
                    : delete y[this.id];
                return a;
            };
            this.resume = function () {};
            this.cleanup = function () {};
            this.setKilledBy = function (b) {
                this.killedByID = b;
            };
            this.setAlpha = function (b) {
                l = b;
            };
        },
        Hc = function () {
            var a = false,
                c,
                f,
                d = null;
            this.preRenderSideLine = function (a) {
                var e = x.createElement("canvas"),
                    b = e.getContext("2d");
                a ? ((e.width = 18), (e.height = 2 * d + 18)) : ((e.width = 2 * d + 18), (e.height = 18));
                b.strokeStyle = "#0555FF";
                b.beginPath();
                b.lineCap = "round";
                b.moveTo(9, 9);
                a ? b.lineTo(9, 9 + 2 * d) : b.lineTo(9 + 2 * d, 9);
                b.shadowColor = "#0555FF";
                b.shadowBlur = 9;
                b.strokeStyle = "#AAFFFF";
                b.lineWidth = 4.5;
                b.stroke();
                return e;
            };
            this.preRenderSideLines = function () {
                c = this.preRenderSideLine(true);
                f = this.preRenderSideLine(false);
                a = true;
            };
            this.drawLimits = function (g) {
                var e = z.getBounds(),
                    b = da / 2;
                if (null == d) d = b;
                else {
                    var b = (b - d) / 20,
                        l = Math.abs(b);
                    1 > l && 0.001 < l && (l = 1);
                    0.001 < l && ((d += b), this.preRenderSideLines());
                }
                a || this.preRenderSideLines();
                g.save();
                g.translate(W, la);
                d + W <= e[1].x && ((g.fillStyle = "#023139"), g.fillRect(d, -d - 1e3, 1e3, 2e3 + 2 * d));
                -d + W >= e[0].x && ((g.fillStyle = "#023139"), g.fillRect(-d - 1e3, -d - 1e3, 1e3, 2e3 + 2 * d));
                -ca / 2 + la > e[0].y && ((g.fillStyle = "#023139"), g.fillRect(-d - 2, -d - 1e3, 2 * d + 4, 1e3));
                ca / 2 + la < e[1].y && ((g.fillStyle = "#023139"), g.fillRect(-d - 2, d, 2 * d + 4, 1e3));
                d + W <= e[1].x && g.drawImage(c, d - 9, -d - 9);
                -d + W >= e[0].x && g.drawImage(c, -d - 9, -d - 9);
                -ca / 2 + la > e[0].y && g.drawImage(f, -d - 9, -d - 9);
                ca / 2 + la < e[1].y && g.drawImage(f, -d - 9, d - 9);
                g.restore();
            };
            this.draw = function (a) {
                var e = z.getBounds(),
                    b = 1 / z.zoom;
                a.save();
                a.globalCompositeOperation = "source-over";
                a.fillStyle = t.bgGrid;
                a.scale(0.65, 0.65);
                a.fillRect(e[0].x / 0.65, e[0].y / 0.65, (canvas.width * b) / 0.65, (canvas.height * b) / 0.65);
                a.restore();
            };
            var h = false;
            this.update = function (a) {
                if (T || !h) h = true;
            };
        },
        Ic = function () {
            var a,
                c = 0;
            this.radiusFromMinimapRadiusPerc = function (a) {
                return (a = (8e3 / da) * (3 + 8 * a));
            };
            this.radiusToMinimapRadius = function (a) {
                return this.radiusFromMinimapRadiusPerc((a - 1) / 540);
            };
            this.draw = function (f) {
                var d = ea - 120 * q - 20 * q,
                    h = V - 120 * q - 20 * q;
                f.save();
                var g = q != c;
                c = q;
                (a && !g) || this.preRenderColliders();
                f.drawImage(a, d - 20 * q, h - 20 * q);
                if (snake) {
                    for (var e = snake.renderedPoints, g = [], b = e.length, l = 0; l < b; l++) {
                        var r = e[l].x + da / 2 - W,
                            v = e[l].y + ca / 2 - la,
                            r = r / da,
                            v = v / ca;
                        g.push({ x: r, y: v });
                    }
                    f.strokeStyle = "hsl(" + snake.hue + ", 100%, 50%)";
                    f.lineWidth = 2;
                    e = g.length;
                    r = g[0].x;
                    v = g[0].y;
                    f.beginPath();
                    f.moveTo(d + 120 * r * q, h + 120 * v * q);
                    for (l = 1; l < e; l++) (r = g[l].x), (v = g[l].y), f.lineTo(d + 120 * r * q, h + 120 * v * q);
                    f.stroke();
                    0 < pa && ((r = Ha + da / 2 - W), (v = Ia + ca / 2 - la), (r /= da), (v /= ca), f.translate(d + 120 * r * q, h + 120 * v * q), f.scale(0.5, 0.5), t.frames.crown.draw(f));
                }
                f.restore();
            };
            this.update = function (a) {};
            this.updateBoundaries = function () {};
            this.preRenderColliders = function () {
                a = x.createElement("canvas");
                var c = a.getContext("2d");
                a.width = 160 * q;
                a.height = 160 * q;
                c.lineWidth = 4;
                c.strokeStyle = "#00ffff";
                c.fillStyle = "#002222";
                c.shadowBlur = 10;
                c.shadowColor = "#00ffff";
                c.beginPath();
                c.rect(20 * q, 20 * q, 120 * q, 120 * q);
                c.stroke();
                c.globalAlpha = 0.5;
                c.shadowBlur = 0;
                c.fill();
                c.globalAlpha = 1;
            };
        },
        Jc = function () {
            function a(a) {
                for (var b = 1; ; ) {
                    var c = a.getUint8(b, true),
                        b = b + 1;
                    if (0 == c) break;
                    switch (c) {
                        case 1:
                            a.getUint16(b, true);
                            b += 2;
                            b = Qa(a, b);
                            c = b.nick;
                            b = b.offset;
                            I.addMessage("Killed", 0, formatName(c));
                            Fa++;
                            z.shake(7);
                            break;
                        case 2:
                            a.getUint16(b, true);
                            b += 2;
                            b = Qa(a, b);
                            c = b.nick;
                            b = b.offset;
                            I.addMessage("Killed by ", 1, formatName(c));
                            interactedSnakeName = formatName(c);
                            break;
                        default:
                            console.log("Unknown event code");
                    }
                }
            }
            function c(a) {
                for (var b = 1, c = [], d = false; ; ) {
                    var g = a.getUint16(b, true),
                        b = b + 2;
                    if (0 == g) break;
                    var d = true,
                        f;
                    f = a.getUint32(b, true);
                    var b = b + 4,
                        b = Qa(a, b),
                        h = b.nick,
                        b = b.offset,
                        u = {};
                    u.nick = h;
                    u.score = f;
                    u.id = g;
                    c.push(u);
                }
                d && I.refreshLeaderboard(c);
                return b;
            }
            function f(a) {
                for (var b = 1; ; ) {
                    var c = a.getUint16(b, true),
                        b = b + 2;
                    if (0 == c) {
                        b != a.byteLength && ((pa = a.getUint16(b, true)), (b += 2), 0 < pa && ((c = a.getFloat32(b, true)), (b += 4), (a = -a.getFloat32(b, true)), (Za = Ha), ($a = Ia), (ab = 10 * c), (bb = 10 * a), (Xb = P)));
                        break;
                    }
                    var d = a.getUint8(b, true),
                        b = b + 1,
                        g;
                    switch (d) {
                        case 0:
                            (g = y[c]) ? (b = g.updateNetwork(a, b, false)) : console.log("entity with id: " + c + " not found");
                            break;
                        case 1:
                            var d = a.getUint8(b, true),
                                b = b + 1,
                                f = a.getUint8(b, true),
                                b = b + 1,
                                b = Qa(a, b),
                                h = b.nick;
                            -1 != h.indexOf("\ufdfd") && (h = "<Unnamed>");
                            b = b.offset;
                            g = d;
                            var u = null;
                            switch (g) {
                                case 5:
                                    u = new Cb();
                                    break;
                                case 4:
                                    if (0 == f) u = new ic();
                                    else if (1 == f) u = new Energy();
                                    else if (2 == f || 3 == f) u = new Tri(f);
                                    break;
                                case 1:
                                    u = f == SUB_ENTITY_BOUNDARY ? new Boundary() : new Collider(f);
                                    break;
                                default:
                                    console.log("ERROR: Creating unknown entity type: " + g + " Subtype: " + f), assert(false, "Invalid Entity");
                            }
                            (g = u) ? ((g.nick = h), (g.id = c), (y[c] = g), (b = g.updateNetwork(a, b, true))) : console.log("Unable to create entity. Entity Type is: " + d);
                            break;
                        case 2:
                            d = a.getUint16(b, true);
                            b += 2;
                            h = a.getUint8(b);
                            b += 1;
                            (g = y[c])
                                ? ((g.killReason = h),
                                  (g.killedByID = d),
                                  (c = g == snake),
                                  (b = g.deleteNetwork(a, b)),
                                  c && isInGame && ((isInGame = false), (snake = null), (mySnake.angle = Math.PI), (mySnake.throttle = 0), killCount++, (Fa = 0), (s.localStorage.killCount = killCount), I.fastHideTalkLayer(), Ga || killPlayerDelay()))
                                : (console.log("ERROR: Entity does not exist: " + c), (s.location.href = s.location.href));
                            break;
                        default:
                            console.log("Invalid entity flag");
                    }
                }
            }
            var d, h;
            this.sentHello = this.hasConnection = false;
            this.remoteHost = null;
            this.connectRetry = 0;
            this.lastUpdateBool = false;
            this.roomNumber = 0;
            this.directed = false;
            this.roomID = 0;
            this.connectVar = null;
            var g = website,
                g = 1 == websiteSplitSize || 3 == websiteSplitSize ? website + ":81/" : "master." + website;
            this.getServerAndConnect = function () {
                var a = null,
                    a = "",
                    b;
                isSiteValid() || (b = parent.location.hash);
                if (b) (a = b), (a = a.substring(1, a.length)), (a = ";" + a), (n.directed = true);
                else if (queryString.ip) {
                    a = queryString.ip;
                    a = a.replace("%3A", ":");
                    n.remoteHost = a;
                    n.connect();
                    return;
                }
                b = eb;
                queryString.cc && (b = queryString.cc);
                if (void 0 == b) setTimeout(n.getServerAndConnect, 200);
                else {
                    var c = "";
                    isHttps && (c = "s");
                    k.ajax({
                        url: "http" + c + "://" + g,
                        type: "PUT",
                        success: function (b) {
                            if ("0" == b) k("#topGui").hide(), k("#topGuiConnecting").hide(), k("#roomFailed").show();
                            else {
                                b = b.split("!");
                                n.roomID = 0;
                                1 < b.length && (n.roomID = b[1]);
                                var a = b[0];
                                b = a.split("/");
                                n.roomNumber = 0;
                                1 < b.length && ((n.roomNumber = b[1]), (a = b[0]));
                                n.remoteHost = a;
                                n.connect();
                            }
                        },
                        error: function () {
                            n.connectVar = setTimeout(n.getServerAndConnect, 1e3);
                        },
                        dataType: "text",
                        contentType: "text/plain",
                        method: "PUT",
                        cache: false,
                        crossDomain: true,
                        data: b + a,
                    });
                }
            };
            this.connect = function () {
                if (gameInFocus || debug) {
                    var a = "ws://" + n.remoteHost;
                    if (isHttps) {
                        var b = n.remoteHost.split(":"),
                            a = b[1],
                            b = b[0].split("."),
                            a = parseInt(a) + 1e3;
                        0 < n.roomNumber && (a = parseInt(n.roomNumber) + 8080 + 1e3);
                        a = "wss://" + b[0] + "-" + b[1] + "-" + b[2] + "-" + b[3] + ".powerline.io:" + a;
                    } else 0 < n.roomNumber && (a = "ws:" + a.split(":")[1] + ":" + (parseInt(n.roomNumber) + 8080));
                    debug && console.log("Connecting to " + a + "...");
                    try {
                        d = new WebSocket(a);
                    } catch (c) {
                        setTimeout(n.getServerAndConnect, 1e3);
                        return;
                    }
                    d.binaryType = "arraybuffer";
                    d.onopen = n.onSocketOpen;
                    d.onclose = n.onSocketClose;
                    d.onmessage = n.onSocketMessage;
                    d.onerror = n.onError;
                } else setTimeout(n.getServerAndConnect, 100);
            };
            this.disconnect = function () {
                n.directed && (isSiteValid() || (s.location.hash = ""), (n.directed = false));
                n.roomID = 0;
                d && d.close();
            };
            this.onSocketOpen = function (a) {
                n.connectVar && clearTimeout(n.connectVar);
                debug && console.log("Connected!");
                n.connectRetry = 0;
                n.hasConnection = true;
                n.directed = false;
                t.loaded && n.hello();
            };
            this.onSocketClose = function (a) {
                n.connectionClosed();
            };
            this.onSocketMessage = function (a) {
                n.processMessage(a.data);
            };
            this.onError = function (a) {
                console.log("socket error");
            };
            this.hello = function () {
                n.sendHello();
                n.ping();
                n.sentHello = true;
                k("#copyLink").fadeIn(300);
                k("#topGui").show();
                k("#topGuiConnecting").hide();
                k(".btn-needs-server").removeAttr("disabled");
                k("#nick").focus();
            };
            this.processConfig = function (a, b) {
                var c = 1,
                    d = false;
                176 == b && (d = true);
                var g = a.getFloat32(c, true),
                    c = c + 4;
                da = 10 * g;
                ca = 10 * g;
                console.log(ca)
                d && ((W = 10 * a.getFloat32(c, true)), (c += 4), (la = 10 * a.getFloat32(c, true)), (c += 4));
                debug && console.log(da / 10);
                Ta = a.getFloat32(c, true);
                c += 4;
                Tb = a.getFloat32(c, true);
                c += 4;
                Ub = 10 * a.getFloat32(c, true);
                c += 4;
                pb = 10 * a.getFloat32(c, true);
                c = c + 4 + 4;
                db = a.getFloat32(c, true);
                console.log(db);
                c += 4;
                a.getFloat32(c, true);
                c += 4;
                Ab = 0 == db ? false : true;
                Zb = a.getFloat32(c, true);
                c += 4;
                Ja = a.getFloat32(c, true);
                Vb = true;
            };
            this.processMessage = function (e) {
                e = new DataView(e);
                var b = e.getUint8(0);
                if (1 == b) {
                    Xa &&
                        ((e = +new Date() - h),
                        otherStatsElement && otherStatsElement.updateLag(e),
                        150 < e
                            ? this.ping()
                            : setTimeout(function () {
                                  n.ping();
                              }, 150 - e));
                }
                else if (0 == b) (b = 1), (Wa = e.getUint16(b, true)), (b += 2), n.pong();
                else if (160 == b || 176 == b) {
                    this.processConfig(e, b);
                }
                else if (161 == b) {
                    var b = 1,
                        d = e.getUint32(b, true),
                        b = b + 4;
                    Z = d;
                    isInGame = true;
                    serverTime = +new Date();
                    HideOverlay();
                } else if (163 == b) f(e), (objectCount = Object.keys(y).length), (x.title = 0 < objectCount && debug ? "powerline.io (" + Ua + ", " + objectCount + ")" : "powerline.io!");
                else if (164 == b) {
                    a(e); 
                }
                else if (165 == b)
                    if (((b = c(e)), (d = e.getUint16(b, true)), (b += 2), 0 < d)) {
                        d = e.getUint32(b, true);
                        b += 4;
                        e = e.getUint16(b, true);
                        b += 2;
                        I.updateRank(e, d);
                        if (0 == leaderboardRank || leaderboardRank > e) leaderboardRank = e;
                        if (0 == snakeLength || snakeLength < d) snakeLength = d;
                    } else I.updateRank(0, 0);
            };
            this.connectionClosed = function () {
                L.gameCleanup();
                n.sentHello = false;
                n.hasConnection = false;
                killPlayerDelay(-1);
                k("#topGui").hide();
                k("#topGuiConnecting").show();
                k("#copyLink").fadeOut(300);
                k(".btn-needs-server").attr("disabled", "disabled");
                var a = this.connectRetry;
                5 < a && (a = 5);
                gameInFocus && setTimeout(this.getServerAndConnect, 1e3 + 1e3 * a);
                n.connectRetry++;
            };
            this.sendSingleByte = function (a) {
                var b = new ArrayBuffer(1);
                new DataView(b).setUint8(0, a);
                d.send(b);
            };
            this.sendHello = function () {
                var a = new ArrayBuffer(5),
                    b = new DataView(a);
                debug ? b.setUint8(0, 171) : b.setUint8(0, 191);
                b.setUint16(1, (ea / 10) * 1, true);
                b.setUint16(3, (V / 10) * 1, true);
                d.send(a);
            };
            this.sendNick = function (a, b) {
                myName = a;
                var c = new ArrayBuffer(3 + 2 * a.length),
                    g = new DataView(c);
                g.setUint8(0, 3);
                for (var f = 0; f < a.length; ++f) g.setUint16(1 + 2 * f, a.charCodeAt(f), true);
                d.send(c);
            };
            this.sendTurnPoint = function (a, b) {
                var c = new ArrayBuffer(11),
                    g = new DataView(c),
                    f = 0;
                g.setUint8(f, 6);
                f += 1;
                g.setUint8(f, a, true);
                f += 1;
                g.setFloat32(f, b, true);
                var h = 0;
                if (!gameInFocus || OverlayVisible) h |= 1;
                g.setUint8(f + 4, h, true);
                d.send(c);
            };
            this.sendDirection = function () {
                var a = new ArrayBuffer(3),
                    b = new DataView(a);
                b.setUint8(0, 5);
                b.setUint8(1, mySnake.direction, true);
                var c = 0;
                if (!gameInFocus || OverlayVisible) c |= 1;
                b.setUint8(2, c, true);
                d.send(a);
            };
            this.sendResize = function () {
                var a = new ArrayBuffer(5),
                    b = new DataView(a);
                b.setUint8(0, 7);
                var c = 1;
                HighGraphicsEnabled || (c = 2);
                b.setUint16(1, (ea / 10) * 1 * c, true);
                b.setUint16(3, (V / 10) * 1 * c, true);
                d.send(a);
            };
            this.sendBoost = function (a) {
                var b = new ArrayBuffer(2),
                    c = new DataView(b);
                c.setUint8(0, 8);
                a ? c.setUint8(1, 1) : c.setUint8(1, 0);
                d.send(b);
            };
            this.leave = function () {
                var a = new ArrayBuffer(1);
                new DataView(a).setUint8(0, 4);
                d.send(a);
            };
            this.bigPicture = function () {
                var a = new ArrayBuffer(1);
                new DataView(a).setUint8(0, 11);
                d.send(a);
            };
            this.debugFoodGrab = function () {
                var a = new ArrayBuffer(1);
                new DataView(a).setUint8(0, 9);
                d.send(a);
            };
            this.sendTalk = function (a) {
                var b = new ArrayBuffer(2),
                    c = new DataView(b);
                c.setUint8(0, 12);
                c.setUint8(1, a);
                d.send(b);
            };
            this.ping = function () {
                if (this.hasConnection) {
                    var a = new ArrayBuffer(1);
                    new DataView(a).setUint8(0, 0);
                    d.send(a);
                    h = +new Date();
                }
            };
            this.pong = function () {
                if (this.hasConnection) {
                    var a = new ArrayBuffer(1);
                    new DataView(a).setUint8(0, 16);
                    d.send(a);
                }
            };
        },
        Oc = function (a) {
            function c() {
                I = new uc();
                yb = new sc();
                n.hasConnection && !n.sentHello && n.hello();
                l.init();
            }
            var f = this,
                d = [{}, {}],
                h,
                g;
            this.context = g;
            var e = 0,
                b = 0,
                l,
                r = 1,
                v = false;
            f.update = function (a) {
                I && I.update(a);
                laserExists = false;
                for (var c in y) {
                    var d = y[c];
                    d.tutorial || (d.update(a), c == Z && (snake = y[c]));
                }
                justTurned = false;
                z.update(a);
                G.update(a);
                O = { x: (h.width / 2 + (z.x * z.zoom - h.width / 2)) / z.zoom, y: (h.height / 2 + (z.y * z.zoom - h.height / 2)) / z.zoom };
                0 < cb && 1 < xa && ((xa -= 0.2), 1 > xa && (xa = 1));
                Ya.update(a);
                zb.update(a);
                0 < pa && this.updateOffscreenInfo(1);
                ia || OverlayVisible ? 1 == ia && 0 < e && ((e -= (a / 1e3) * 3), 0 >= e && (e = 0)) : ((e += (a / 1e3) * 3), 1 < e && (e = 1));
                1 == ia && ((wa && !(0 < Ca)) || OverlayVisible ? 1 == wa && 0 < b && ((b -= (a / 1e3) * 3), 0 >= b && (b = 0)) : ((Ca -= a), 0 > Ca && (Ca = 0), (b += (a / 1e3) * 3), 1 < b && (b = 1)));
                l.isInitialized && l.update(a);
                v && ((r -= 0.01), 0 > r && (r = 0));
            };
            f.draw = function (a) {
                if (t.loaded && (z.setupContext(g), Ya.draw(g), Vb)) {
                    if (T) {
                        for (var c in y) {
                            var d = y[c];
                            d.tutorial || (d.setAlpha(r), d.draw(g, a));
                        }
                        for (c in y) (d = y[c]), d.tutorial || d.drawAfter(g, a);
                        for (c in y) y[c].drawInfo(g);
                        G.drawBehind(g);
                    }
                    T && (G.drawLayer2(g), G.draw(g), G.drawExplosions(g), yb.draw(g), Ya.drawLimits(g));
                    isInGame && snake && snake.drawInput(g);
                    0 < pa && this.drawOffscreenInfo(g, 1);
                    z.startUILayer();
                    l.isInitialized && l.draw(g);
                    0 < e && !OverlayVisible && t.keysImage && (g.save(), (g.globalAlpha = e), g.scale(q, q), g.translate((0.5 * ea) / q, (0.825 * V) / q), g.drawImage(t.keysImage, -t.keysImage.width / 2, -t.keysImage.height / 2), g.restore());
                    0 < b && !OverlayVisible && t.boostImage && (g.save(), (g.globalAlpha = b), g.scale(q, q), g.translate((0.5 * ea) / q, (0.825 * V) / q), g.drawImage(t.boostImage, -t.boostImage.width / 2, -t.boostImage.height / 2), g.restore());
                    isInGame && zb.draw(g);
                    I.draw(g);
                }
            };
            f.updateOffscreenInfo = function (b) {
                if (null != snake) {
                    var a = z.getBounds(),
                        c = a[1].x,
                        e = a[0].x,
                        g = a[0].y,
                        f = a[1].y,
                        l,
                        h,
                        a = mb((P - Xb) / OneHundred, 0, 1);
                    Ha = a * (ab - Za) + Za;
                    Ia = a * (bb - $a) + $a;
                    Wb != pa && ((Ha = ab), (Ia = bb), (Za = ab), ($a = bb), (Wb = pa));
                    l = Ha;
                    h = Ia;
                    if (snake && !Aa(l, h, 50)) {
                        var a = O.x - l,
                            r = (O.y - h) / a,
                            v = O.y - r * O.x;
                        d[b].y = 0 > a ? r * c + v : r * e + v;
                        d[b].y < g ? (d[b].y = g) : d[b].y > f && (d[b].y = f);
                        d[b].x = (d[b].y - v) / r;
                        c = d[b].x - l;
                        e = d[b].y - h;
                        c = Math.sqrt(c * c + e * e);
                        d[b].scale = 1;
                        300 < c && ((d[b].scale = 1 - (c - 300) / 4e3), 0.5 > d[b].scale && (d[b].scale = 0.5));
                        1 < r ? (r = 1) : -1 > r && (r = -1);
                        d[b].angle = Math.acos(r);
                        0 > a && (d[b].angle += Math.PI);
                        d[b].outside = true;
                    } else d[b].outside = false;
                }
            };
            f.drawOffscreenInfo = function (b, a) {
                if (snake && d[a].outside) {
                    b.save();
                    b.translate(d[a].x, d[a].y);
                    b.save();
                    var c = Pb(0, 32, -d[a].angle);
                    b.translate(c.x, c.y);
                    b.scale(0.5 * d[a].scale, 0.5 * d[a].scale);
                    t.frames.crown.draw(b);
                    b.restore();
                    b.rotate(-d[a].angle);
                    b.translate(0, 20);
                    c = 0.9 * d[a].scale;
                    b.fillStyle = "hsl(47, 100%, 70%)";
                    b.beginPath();
                    b.moveTo(-4 * c, 0);
                    b.lineTo(4 * c, 0);
                    b.lineTo(0, -10 * c);
                    b.fill();
                    b.restore();
                }
            };
            f.gameCleanup = function () {
                snake = void 0;
                isInGame = false;
                Ua = 0;
                for (id in y) delete y[id];
                y = {};
                mySnake.direction = 1;
            };
            var J;
            f.resize = function (b) {
                C();
                n.hasConnection && (J && clearTimeout(J), (J = setTimeout(n.sendResize, 200)));
            };
            f.clearSpeedupTutorial = function () {
                l.clear();
            };
            f.initSpeedupTutorial = function () {
                l.init();
            };
            f.fadeOutGame = function () {
                v = true;
            };
            f.resetAlpha = function () {
                v && ((v = false), (r = 1));
            };
            var C = function () {
                var b = 2;
                HighGraphicsEnabled && (b = 1);
                h.width = s.innerWidth / b;
                h.height = s.innerHeight / b;
                ea = h.width;
                V = h.height;
                var a = V * b,
                    c = -50 + 50 * b + "%",
                    c = "translate(" + c + "," + c + ") scale(" + b + ")";
                k("#canvas").css({ transform: c });
                k("#canvas").css({ "-ms-transform": c });
                k("#canvas").css({ "-webkit-transform": c });
                q = 0.92 * Math.max(V / 850, ea / 1500);
                q *= s.devicePixelRatio / sb;
                ma = Math.min(1, a / 850);
                c = 440 * ma;
                if (0 < c) {
                    var d = "translate(-50%,0%) scale(" + ma + ")";
                    k("#mainDialog").css({ transform: d });
                    k("#mainDialog").css({ "-ms-transform": d });
                    k("#mainDialog").css({ "-webkit-transform": d });
                    a = a / 2 - 0.38 * c;
                    k("#mainDialog").css({ top: a + "px" });
                }
                statsElement && ((statsElement.domElement.style.position = "absolute"), (statsElement.domElement.style.left = 0.31 * h.width * b + "px"), (statsElement.domElement.style.top = h.height * b - 18 - 30 + "px"));
                otherStatsElement && ((otherStatsElement.domElement.style.position = "absolute"), (otherStatsElement.domElement.style.left = (0.31 * h.width - 100 / b) * b + "px"), (otherStatsElement.domElement.style.top = h.height * b - 18 - 30 + "px"));
            };
            f.getMouseWorldPosition = function () {
                var b = 1;
                HighGraphicsEnabled || (b = 2);
                return { x: (spawnPosX + (z.x * z.zoom - (h.width * b) / 2)) / z.zoom, y: (spawnPosY + (z.y * z.zoom - (h.height * b) / 2)) / z.zoom };
            };
            (function () {
                h = a;
                g = h.getContext("2d");
                f.context = g;
                C();
                Ya = new Hc();
                G = new Kc();
                t = new qc();
                t.load(c);
                myName = "";
                z = new Lc(h, g, 0, 0);
                zb = new Ic();
                n = new Jc();
                n.getServerAndConnect();
                l = new Mc();
                D = new Nc();
                D.load(function () {});
            })();
        },
        Lc = function (a, c, f, d) {
            var h = this;
            this.x = f;
            this.y = d;
            this.minZoom = 1;
            this.maxZoom = 2;
            this.zoom = this.minZoom;
            var g = 0,
                e,
                b = 0,
                l = 0,
                r = 0,
                v = 0;
            this.setupContext = function (b) {
                var c = h.zoom,
                    d = a.width / 2 - h.x * c,
                    e = a.height / 2 - h.y * c;
                b.setTransform(1, 0, 0, 1, 0, 0);
                b.translate(d + r, e + v);
                b.scale(c, c);
            };
            this.applyShake = function (a) {
                if (T)
                    if (0 < g) {
                        var c = e;
                        250 > g && (c = (g / 1e3 / 0.5) * e);
                        b += 1;
                        l += 1.1;
                        var d = Math.sin(b) * (c / 4),
                            c = Math.cos(l) * c;
                        r = d;
                        v = c;
                        g -= a;
                    } else v = r = 0;
            };
            this.update = function (b) {
                T || (h.y = 0);
                if (isInGame || OverlayVisible) {
                    xb && (wb = 0.6);
                    Va += (wb - Va) / 10;
                    h.zoom = (1 / (s.devicePixelRatio / sb)) * Va * 1;
                    h.zoom *= q;
                    var a = h.x,
                        c = h.y;
                    if (snake && !Ga) snake.beingDeleted || ((a = snake.x), (c = snake.y)), (T = true), 4 > killCount && L.resetAlpha();
                    else if (0 < cb) {
                        var d = y[cb];
                        d && ((a += (d.x - a) / xa), (c += (d.y - c) / xa));
                    }
                    h.x = a;
                    h.y = c;
                    this.applyShake(b);
                }
            };
            this.setPosition = function (b, a) {
                h.x = b;
                h.y = a;
            };
            this.shake = function (b) {
                T && ((g = 500), (e = b));
            };
            this.getBounds = function () {
                return [
                    { x: h.x - a.width / 2 / h.zoom, y: h.y - a.height / 2 / h.zoom },
                    { x: h.x + a.width / 2 / h.zoom, y: h.y + a.height / 2 / h.zoom },
                ];
            };
            this.getOuterBounds = function () {
                return [
                    { x: h.x - a.width / 2 / h.minZoom, y: h.y - a.height / 2 / h.minZoom },
                    { x: h.x + a.width / 2 / h.minZoom, y: h.y + a.height / 2 / h.minZoom },
                ];
            };
            this.getInnerBounds = function () {
                return [
                    { x: h.x - a.width / 2 / h.maxZoom, y: h.y - a.height / 2 / h.maxZoom },
                    { x: h.x + a.width / 2 / h.maxZoom, y: h.y + a.height / 2 / h.maxZoom },
                ];
            };
            this.startUILayer = function () {
                c.setTransform(1, 0, 0, 1, 0, 0);
            };
        },
        gb = function () {
            this.width;
            this.height;
            var a,
                c,
                f,
                d,
                h = void 0;
            this.y = this.x = 0;
            var g, e;
            this.canvas;
            this.frameWithCanvas = function (b, a, c) {
                this.width = b.width;
                this.height = b.height;
                this.canvas = b;
                g = a;
                e = c;
            };
            this.setFrameInfo = function (b, l) {
                h = l;
                a = b[1];
                c = b[2];
                this.width = b[3];
                this.height = b[4];
                f = b[5];
                d = b[6];
                g = -this.width * f;
                e = -this.height * d;
            };
            this.draw = function (b) {
                h ? b.drawImage(h, a, c, this.width, this.height, g + this.x, e + this.y, this.width, this.height) : b.drawImage(this.canvas, 0, 0, this.width, this.height, g + this.x, e + this.y, this.width, this.height);
            };
            this.renderTintedFrame = function (b) {
                var d = x.createElement("canvas"),
                    f = d.getContext("2d");
                d.width = this.width;
                d.height = this.height;
                var v = x.createElement("canvas");
                v.width = this.width;
                v.height = this.height;
                var k = v.getContext("2d");
                k.fillStyle = b;
                k.fillRect(0, 0, v.width, v.height);
                k.globalCompositeOperation = "destination-atop";
                k.drawImage(h, a, c, this.width, this.height, 0, 0, this.width, this.height);
                f.globalAlpha = 1;
                f.drawImage(v, 0, 0);
                b = new gb();
                b.frameWithCanvas(d, g, e);
                return b;
            };
            this.getImageCopy = function () {
                var b = x.createElement("canvas");
                b.width = this.width;
                b.height = this.height;
                var d = b.getContext("2d");
                d.drawImage(h, a, c, this.width, this.height, 0, 0, this.width, this.height);
                var e = d.getImageData(0, 0, this.width, this.height);
                return { canvas: b, ctx: d, toData: e.data, to: e };
            };
            this.generateTintImage2 = function (b, d, f, v) {
                var k = x.createElement("canvas");
                k.width = this.width;
                k.height = this.height;
                var n = k.getContext("2d");
                n.drawImage(h, a, c, this.width, this.height, 0, 0, this.width, this.height);
                for (var u = n.getImageData(0, 0, this.width, this.height), m = u.data, s = m.length, q = 0; q < s; )
                    (m[q] = m[q++] * (1 - v) + b * v), (m[q] = m[q++] * (1 - v) + d * v), (m[q] = m[q++] * (1 - v) + f * v), (m[q] = 0.8 * m[q++]);
                n.putImageData(u, 0, 0);
                b = new gb();
                b.frameWithCanvas(k, g, e);
                return b;
            };
            this.generateTintImage = function (b, a, c, d) {
                var f = x.createElement("canvas");
                f.width = this.width;
                f.height = this.height;
                var h = f.getContext("2d");
                h.globalAlpha = 1;
                h.globalCompositeOperation = "copy";
                h.drawImage(b[3], 0, 0);
                h.globalCompositeOperation = "lighter";
                0 < a && ((h.globalAlpha = a / 255), h.drawImage(b[0], 0, 0));
                0 < c && ((h.globalAlpha = c / 255), h.drawImage(b[1], 0, 0));
                0 < d && ((h.globalAlpha = d / 255), h.drawImage(b[2], 0, 0));
                b = new gb();
                b.frameWithCanvas(f, g, e);
                return b;
            };
            this.generateRGBKs = function () {
                var b = [],
                    d = x.createElement("canvas");
                d.getContext("2d");
                d.width = this.width;
                d.height = this.height;
                d = x.createElement("canvas");
                d.width = this.width;
                d.height = this.height;
                d = d.getContext("2d");
                d.drawImage(h, a, c, this.width, this.height, 0, 0, this.width, this.height);
                for (var e = d.getImageData(0, 0, this.width, this.height).data, g = e.length, f = this.getImageCopy(), k = this.getImageCopy(), n = this.getImageCopy(), d = this.getImageCopy(), m = 0; m < g; m += 4)
                    (f.toData[m] = e[m]),
                        (f.toData[m + 1] = 0),
                        (f.toData[m + 2] = 0),
                        (f.toData[m + 3] = e[m + 3]),
                        (k.toData[m] = 0),
                        (k.toData[m + 1] = e[m + 1]),
                        (k.toData[m + 2] = 0),
                        (k.toData[m + 3] = e[m + 3]),
                        (n.toData[m] = 0),
                        (n.toData[m + 1] = 0),
                        (n.toData[m + 2] = e[m + 2]),
                        (n.toData[m + 3] = e[m + 3]),
                        (d.toData[m] = 0),
                        (d.toData[m + 1] = 0),
                        (d.toData[m + 2] = 0),
                        (d.toData[m + 3] = e[m + 3]);
                f.ctx.putImageData(f.to, 0, 0);
                k.ctx.putImageData(k.to, 0, 0);
                n.ctx.putImageData(n.to, 0, 0);
                d.ctx.putImageData(d.to, 0, 0);
                e = new Image();
                e.src = f.canvas.toDataURL();
                f = new Image();
                f.src = k.canvas.toDataURL();
                k = new Image();
                k.src = n.canvas.toDataURL();
                n = new Image();
                n.src = d.canvas.toDataURL();
                b.push(e);
                b.push(f);
                b.push(k);
                b.push(n);
                return b;
            };
            this.renderToCanvas = function () {
                var b = x.createElement("canvas"),
                    d = b.getContext("2d");
                b.width = this.width;
                b.height = this.height;
                var e = x.createElement("canvas");
                e.width = this.width;
                e.height = this.height;
                e.getContext("2d");
                h ? d.drawImage(h, a, c, this.width, this.height, 0, 0, this.width, this.height) : d.drawImage(this.canvas, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
                d.globalAlpha = 1;
                d.drawImage(e, 0, 0);
                return b;
            };
        },
        Kc = function () {
            var a = {},
                c = [],
                f = [],
                d = [],
                h = [];
            this.addAnimationInfo = function (c, d) {
                a[c] = d;
            };
            this.setAnimationInterval = function (c, d) {
                a[c].setInterval(d);
            };
            this.createAnimation = function (c) {
                c = a[c];
                var d = new jc();
                d.setup(c);
                return d;
            };
            this.runAnimation = function (a) {
                c.push(a);
            };
            this.runAnimationLayer2 = function (a) {
                f.push(a);
            };
            this.runAnimationBehind = function (a) {
                d.push(a);
            };
            this.addBlast = function (a, c, b, d, f) {
                var h = G.createAnimation("explosion");
                h.setScale(b);
                h.posX = a;
                h.posY = c;
                G.runAnimationBehind(h);
                a = 1 - lb(a, c, O.x, O.y) / PLAY_DISTANCE;
                0.01 < a && D.playSound(SOUND_PLANE_EXPL, a * f, 1, d, null);
            };
            this.addExplosion = function (a, c, b, d) {
                if (Aa(a, c, 100) && 50 > +new Date() - P) {
                    if (1 >= h.length) {
                        var f = new Pc();
                        f.init(a, c, b, d);
                        h.push(f);
                    }
                    this.addBlast(a, c, 1, cc, 1);
                }
            };
            this.update = function (a) {
                for (var c in h) {
                    var b = h[c];
                    b.update(a);
                    b.deleting && (h.splice(c, 1), delete b);
                }
            };
            this.drawBehind = function (a) {
                for (var c in d) {
                    var b = d[c];
                    a.save();
                    a.translate(b.posX, b.posY);
                    a.scale(b.scaleX, b.scaleY);
                    a.rotate(b.rotation);
                    b.draw(a);
                    a.restore();
                }
            };
            this.drawLayer2 = function (a) {
                for (var c in f) {
                    var b = f[c];
                    a.save();
                    a.translate(b.posX, b.posY);
                    a.scale(b.scaleX, b.scaleY);
                    a.rotate(b.rotation);
                    b.draw(a);
                    a.restore();
                }
            };
            this.draw = function (a) {
                for (var d in c) {
                    var b = c[d];
                    a.save();
                    a.translate(b.posX, b.posY);
                    a.scale(b.scaleX, b.scaleY);
                    a.rotate(b.rotation);
                    b.draw(a);
                    a.restore();
                }
            };
            this.drawExplosions = function (a) {
                for (var c in h) h[c].draw(a);
            };
        },
        jc = function () {
            var a = 0,
                c = 0,
                f = 0;
            this.frames;
            this.frameCount = 0;
            this.deleting = false;
            this.posY = this.posX = 0;
            this.scaleY = this.scaleX = 1;
            this.rotation = 0;
            this.alpha = 1;
            this.copy = function (a) {
                a = new jc();
                a.frames = this.frames;
                a.frameCount = this.frameCount;
                a.deleting = this.deleting;
                a.posX = this.posX;
                a.posY = this.posY;
                a.scaleX = this.scaleX;
                a.scaleY = this.scaleY;
                a.rotation = this.rotation;
                a.alpha = this.alpha;
                a.setInterval(c);
                return a;
            };
            this.setup = function (a) {
                c = a.interval;
                this.frames = a.frames;
                this.frameCount = a.frames.length;
            };
            this.setInterval = function (a) {
                c = a;
            };
            this.update = function (d) {
                this.deleting || (f > c && (a++, (f -= c)), (f += d), a >= this.frameCount && (this.deleting = true));
            };
            this.setScale = function (a) {
                this.scaleY = this.scaleX = a;
            };
            this.draw = function (c) {
                1 > this.alpha && (c.globalAlpha = this.alpha);
                this.frames[a].draw(c);
            };
        };
    gameSheetInfo = [
        ["crown", 382, 102, 31, 27, 0.5, 0.5],
        ["food", 132, 2, 100, 100, 0.5, 0.5],
        ["glow", 234, 2, 98, 98, 0.5, 0.505],
        ["glow_hard", 334, 2, 98, 98, 0.5, 0.505],
        ["grid", 2, 2, 128, 128, 0.5, 0.5],
        ["head_dot", 132, 104, 47, 46, 0.5, 0.5],
        ["lightning1", 415, 102, 18, 30, 0.5, 0.5],
        ["lightning2", 483, 99, 19, 30, 0.526, 0.5],
        ["lightning3", 461, 99, 20, 30, 0.5, 0.5],
        ["lightning_glow", 435, 99, 24, 36, 0.5, 0.5],
        ["particleDot", 461, 131, 14, 19, 0.5, 0.474],
        ["skullback", 300, 133, 28, 17, 0.5, 0.176],
        ["skullbase", 226, 104, 35, 40, 0.514, 0.5],
        ["skulleyesblue", 2, 135, 24, 11, 0.5, 0.182],
        ["skulleyesgreen", 477, 131, 24, 11, 0.5, 0.182],
        ["skulleyesred", 382, 131, 24, 11, 0.5, 0.182],
        ["skulleyesyellow", 44, 132, 24, 11, 0.5, 0.182],
        ["skullglow", 434, 2, 58, 64, 0.5, 0.5],
        ["skullgradient", 263, 102, 35, 40, 0.514, 0.5],
        ["spark0", 434, 68, 49, 29, 0.51, 0.483],
        ["spark1", 300, 102, 41, 29, 0.61, 0.483],
        ["spark2", 343, 102, 37, 30, 0.432, 0.5],
        ["trophy", 181, 104, 43, 42, 0.5, 0.5],
        ["wall_stretch", 2, 132, 40, 1, 0.5, 0.5],
    ];
    var Qc = function () {
            this.color = { h: "61", s: "100%", l: "100%", a: 1 };
            this.rotation = 0;
            this.scale = 1;
            this.pos = { x: 0, y: 0 };
            this.speed = { x: 0, y: 0 };
            this.time = 0;
            this.used = this.active = false;
            this.rotationSpeed = 0;
            this.draw = function (a, c) {
                a.save();
                a.translate(this.pos.x, this.pos.y);
                a.scale(this.scale, this.scale);
                a.rotate(this.rotation);
                a.translate(10, -2);
                a.globalAlpha = this.color.a;
                c.draw(a);
                a.restore();
            };
        },
        fc = function () {
            var a = 0,
                c = 0,
                f = [],
                d = 0;
            this.life = 400;
            var h, g, e, b;
            this.debreeAge = 0;
            this.alpha = 1;
            this.particleFrame;
            this.enabled = false;
            this.setEnabled = function (a) {
                this.enabled || this.resetSystem();
                this.enabled = a;
            };
            this.init = function (l, r, k) {
                d = l;
                b = e = g = h = 0;
                a = r;
                c = k;
                for (l = 0; l < d; l++) (r = new Qc()), this.resetParticle(r), (r.active = false), (r.time = 9999), f.push(r);
            };
            this.resetSystem = function () {
                for (var a = this.life / d, b = 0; b < d; b++) {
                    var c = f[b];
                    this.resetParticle(c);
                    c.active = false;
                    c.time = a * b;
                }
            };
            this.resetParticle = function (d) {
                d.pos.x = a;
                d.pos.y = c;
                d.speed.x = e;
                d.speed.y = b;
                d.time = 0;
                d.color.a = 1;
                d.rotationSpeed = (Math.random() - 0.5) / 10;
                d.rotation = 360 * Math.random();
            };
            this.update = function (a) {
                a = 1e3 / 60;
                for (var b = 0; b < d; b++) {
                    var c = f[b];
                    c.time >= this.life && (c.active || ((c.active = true), (c.time %= this.life)), this.enabled && this.resetParticle(c));
                    c.time += a;
                    if (c.active) {
                        var e = c.time / this.life;
                        1 < e && (e = 1);
                        c.pos.x += 1 * c.speed.x;
                        c.pos.y += 1 * c.speed.y;
                        if (0 <= e && 0.1 > e) {
                            var k = e / 0.1;
                            c.scale = 0.4;
                        } else c.scale = 0.4 + 0.3 * (e - 0.1);
                        c.rotation += c.rotationSpeed;
                        c.color.a = 1;
                        0 <= e && 0.1 > e ? ((k = e / 0.1), (c.color.a = k)) : 0.5 < e && (c.color.a = 1 - (e - 0.5) / 0.5);
                        c.color.a *= this.alpha;
                        c.speed.x += 1 * h;
                        c.speed.y += 1 * g;
                    }
                }
            };
            this.setPosition = function (b, d) {
                a = b;
                c = d;
            };
            this.setLife = function (a) {
                this.life = a;
            };
            this.draw = function (a) {
                for (var b = d - 1; 0 <= b; b--) {
                    var c = f[b];
                    c.active && c.draw(a, this.particleFrame);
                }
            };
        },
        Pc = function () {
            function a(a) {
                return Math.random() * a - a / 2;
            }
            this.deleting = false;
            var c = [],
                f,
                d;
            this.init = function (c, g, e, b) {
                f = c;
                d = g;
                c = 2 + 4 * Math.random();
                g = 2 + 4 * Math.random();
                var l = 2 + 4 * Math.random();
                Math.random();
                var k = Math.PI / 4,
                    n = a(Math.PI / 2),
                    q = a(k) + n,
                    s = Math.cos(q),
                    q = Math.sin(q),
                    u = (2 / 3) * Math.PI + a(k) + n,
                    m = Math.cos(u),
                    u = Math.sin(u),
                    n = (4 / 3) * Math.PI + a(k) + n,
                    k = Math.cos(n),
                    n = Math.sin(n);
                this.addDebree(s * c + e, q * c + b);
                this.addDebree(m * g + e, u * g + b);
                this.addDebree(k * l + e, n * l + b);
            };
            this.addDebree = function (a, g) {
                var e = new Rc();
                e.init(f, d);
                e.setSpeed(a, g);
                c.push(e);
            };
            this.update = function (a) {
                var d = 0;
                for (debreeID in c) {
                    var e = c[debreeID];
                    e.update(a);
                    e.deleting && (c.splice(debreeID, 1), delete e);
                    d++;
                }
                0 == d && (this.deleting = true);
            };
            this.draw = function (a) {
                for (debreeID in c) c[debreeID].draw(a);
            };
        },
        Rc = function () {
            var a,
                c,
                f,
                d,
                h,
                g = 0.08;
            gameEvent.isSpaceWars() && (g = 0);
            var e,
                b,
                l,
                k = 0;
            this.deleting = false;
            this.init = function (a, c) {
                e = a;
                b = c;
                l = new fc();
                l.init(15, e, b);
            };
            this.setSpeed = function (b, e) {
                a = b;
                c = e;
                f = 0;
                d = 0.2 * a;
                h = 0.2 * c;
            };
            this.update = function (n) {
                f += g;
                e += a;
                b += c + f;
                a *= 0.975;
                c *= 0.975;
                g *= 0.975;
                Math.abs(a) < Math.abs(d) && (a = d);
                Math.abs(c) < Math.abs(h) && (c = h);
                3 < f && (f = 3);
                k += n;
                500 < k && 2300 >= k ? (l.debreeAge = (k - 500) / 2300) : 2300 < k && 2500 >= k ? (l.alpha = (2500 - k) / 200) : 2500 < k && (delete l, (this.deleting = true));
                this.deleting || (l.setPosition(e, b), l.updateExplosion(n));
            };
            this.draw = function (a) {
                this.deleting || l.draw(a);
            };
        },
        Mc = function () {
            var a = this,
                c,
                f,
                d = 0,
                h = 0,
                g = 0,
                e = 8,
                b = -4,
                l = 0,
                k = 2,
                n = 0,
                q = 0.5,
                s = 0,
                u = 15,
                m = [],
                t = 99999,
                x,
                B,
                z = 0,
                D = false,
                G = false,
                I = false,
                E = 0;
            this.isInitialized = false;
            a.buildFoodPacket = function (a) {
                var b = new ArrayBuffer(100),
                    b = new DataView(b),
                    c = 0;
                b.setFloat32(c, a.x, true);
                c += 4;
                b.setFloat32(c, a.y, true);
                a.isFull && b.setUint16(c + 4, a.hue, true);
                return b;
            };
            a.buildSnakePacket = function (a) {
                var b = new ArrayBuffer(100),
                    b = new DataView(b),
                    c = 0;
                b.setFloat32(c, a.x, true);
                c += 4;
                b.setFloat32(c, a.y, true);
                c += 4;
                b.setFloat32(c, a.lastLen, true);
                c += 4;
                b.setFloat32(c, a.curLengthDst, true);
                var c = c + 4 + 1,
                    d = a.pointCount;
                b.setUint16(c, d, true);
                c += 2;
                b.setUint8(c, a.flags, true);
                c += 1;
                a.flags & 2 && (b.setFloat32(c, a.rubPoint.x, true), (c += 4), b.setFloat32(c, a.rubPoint.y, true), (c += 4), b.setUint16(c, 1, true), (c += 2));
                b.setUint8(c, 0, true);
                c += 1;
                b.setUint8(c, a.extraSpeed, true);
                c += 1;
                if (a.isFull) {
                    for (var e = 0; e < d; e++) b.setFloat32(c, a.points[e].x, true), (c += 4), b.setFloat32(c, a.points[e].y, true), (c += 4);
                    b.setUint16(c, a.hue, true);
                    c += 2;
                    b.setUint8(c, 0, true);
                } else for (d = a.newPointCount, b.setUint8(c, d, true), c += 1, e = 0; e < d; e++) b.setFloat32(c, a.newPoints[e].x, true), (c += 4), b.setFloat32(c, a.newPoints[e].y, true), (c += 4);
                return b;
            };
            a.update = function (t) {
                if (this.isInitialized && !(100 < t)) {
                    G && ((E += t), 1e3 < E && ((E = 0), (D = true), (G = false)));
                    7 == l && D ? ((z -= 0.04), 0 > z && ((z = 0), a.clear(), a.init(), (nextTipID = 0), (tipDebounce = true))) : ((z += 0.04), 1 < z && (z = 1));
                    c.setAlpha(z);
                    f.setAlpha(z);
                    if (d > OneHundred) {
                        if (void 0 != y[c.id])
                            if (4 <= l && h > s) {
                                if (!I) {
                                    I = true;
                                    c.killReason = 3;
                                    c.beingDeleted = true;
                                    c.setDead();
                                    for (var F = 0; 20 > F; F++) {
                                        var A = s - 30 + 1.5 * F,
                                            B = 0.5 * (Math.random() + 0.5),
                                            w = 0.3 * (Math.random() - 0.5),
                                            A = this.initFood(A, 0, 295 + 50 * Math.random());
                                        A.speedX = B;
                                        A.speedY = w;
                                    }
                                }
                            } else
                                (h += 0.5),
                                    (w = {}),
                                    (w.x = h),
                                    (w.y = g),
                                    (w.lastLen = 2),
                                    (w.curLengthDst = 30),
                                    (w.pointCount = 2),
                                    (w.flags = 0),
                                    (w.extraSpeed = 0),
                                    (w.isFull = false),
                                    (w.newPointCount = 0),
                                    (w = this.buildSnakePacket(w)),
                                    c.updateNetwork(w, 0, false);
                        w = { newPointCount: 0 };
                        0 == l && (-2.6 < b ? ((l = 1), k++, (w.newPointCount = 1), (w.newPoints = []), w.newPoints.push({ x: e, y: b })) : (b += 0.5));
                        B = F = false;
                        if (1 == l || 3 == l)
                            if (((e += q), (e < h - 10 && 1 == l) || (e < h && 3 == l))) (q += 0.03), (F = true), 5 < q && (q = 5), (n += 3), 200 < n && (n = 200), (w.flags |= 2), (w.rubPoint = { x: e - 0.06, y: g }), (B = true);
                            else if ((e >= h - 10 && 1 == l) || e >= h + 4) (e -= q), 1 == l ? (l = 2) : ((l = 4), (s = e)), k++, (w.newPointCount = 1), (w.newPoints = []), w.newPoints.push({ x: e, y: b });
                        F || ((q -= 0.01), 0.5 > q && (q = 0.5), (n -= 1), 0 > n && (n = 0));
                        if (2 == l || 4 == l)
                            2 == l
                                ? -1.2 < b
                                    ? ((l = 3), k++, (w.newPointCount = 1), (w.newPoints = []), w.newPoints.push({ x: e, y: b }), (nextTipID = 1), (tipDebounce = true))
                                    : (b += q)
                                : 0.8 < b
                                ? ((l = 5), k++, (w.newPointCount = 1), (w.newPoints = []), w.newPoints.push({ x: e, y: b }))
                                : (b += q);
                        5 == l && (e > h + 12 ? ((l = 6), k++, (w.newPointCount = 1), (w.newPoints = []), w.newPoints.push({ x: e, y: b })) : (e += q));
                        6 == l && (1 > b ? ((l = 7), k++, (w.newPointCount = 1), (w.newPoints = []), w.newPoints.push({ x: e, y: b }), (nextTipID = 2), (tipDebounce = true)) : (b -= q));
                        if (7 == l) {
                            e -= q;
                            for (var H = m.length, F = 0; F < H; F++)
                                (A = m[F]), f.x < A.x + 30 && void 0 != y[A.id] && !A.beingDeleted && ((A.beingDeleted = true), (A.beginGrabX = A.x), (A.beginGrabY = A.y), A.setKilledBy(f.id), (u += 1.1));
                        }
                        w.x = e;
                        w.y = b;
                        w.lastLen = 2;
                        w.curLengthDst = u;
                        w.pointCount = k;
                        w.isFull = false;
                        w.extraSpeed = 1000;
                        w = this.buildSnakePacket(w);
                        f.updateNetwork(w, 0, false);
                        B && f.setRubSnakeID(x);
                        H = m.length;
                        for (F = 0; F < H; F++)
                            (A = m[F]), (w = {}), (A.speedX *= 0.9), (A.speedY *= 0.9), (w.x = A.x / 10 + A.speedX), (w.y = -A.y / 10 + A.speedY), (w.isFull = false), (w = this.buildFoodPacket(w)), A.updateNetwork(w, 0, false);
                        d -= OneHundred;
                    }
                    void 0 != y[c.id] && c.update(t);
                    void 0 != y[f.id] && f.update(t);
                    H = m.length;
                    for (F = 0; F < H; F++) void 0 != y[m[F].id] && m[F].update(t);
                    d += t;
                }
            };
            a.draw = function (a) {
                var b = 1;
                HighGraphicsEnabled || (b = 2);
                var d = 1.4 / b;
                a.save();
                a.translate(ea / 2 - (435 * ma) / b, 0.5 * V - (209 * ma) / b);
                a.scale(d * ma, d * ma);
                for (var b = m.length, e = (d = 0); e < b; e++) void 0 != y[m[e].id] ? m[e].draw(a) : d++;
                20 == d && 7 == l && (G = true);
                void 0 != y[c.id] && (c.drawAfter(a), c.drawAfter(a));
                void 0 != y[f.id] && (f.drawAfter(a), f.drawAfter(a));
                a.restore();
            };
            a.initFood = function (a, b, c) {
                var d = {},
                    e = new ic();
                e.playSounds = false;
                e.id = t++;
                e.tutorial = true;
                d.x = a;
                d.y = b;
                d.isFull = true;
                d.hue = c;
                a = this.buildFoodPacket(d);
                e.updateNetwork(a, 0, true);
                y[e.id] = e;
                m.push(e);
                return e;
            };
            a.initSnake = function (a) {
                var d = {};
                0 == a
                    ? ((c = new Cb()),
                      (c.playSounds = false),
                      (c.tutorial = true),
                      (c.id = t++),
                      (y[c.id] = c),
                      (x = c.id),
                      (d.lastLen = 2),
                      (d.curLengthDst = 30),
                      (d.pointCount = 2),
                      (d.flags = 0),
                      (d.extraSpeed = 0),
                      (d.isFull = true),
                      (d.points = []),
                      d.points.push({ x: h, y: g }),
                      (h += 30),
                      d.points.push({ x: h, y: g }),
                      (d.x = h),
                      (d.y = g),
                      (d.hue = 320),
                      (a = this.buildSnakePacket(d)),
                      c.updateNetwork(a, 0, true))
                    : ((f = new Cb()),
                      (f.playSounds = false),
                      (f.id = t++),
                      (y[f.id] = f),
                      (B = f.id),
                      (f.tutorial = true),
                      (d.lastLen = 2),
                      (d.curLengthDst = u),
                      (d.pointCount = 2),
                      (d.flags = 0),
                      (d.extraSpeed = 0),
                      (d.isFull = true),
                      (d.points = []),
                      d.points.push({ x: e, y: b }),
                      d.points.push({ x: e, y: b }),
                      (d.x = e),
                      (d.y = b),
                      (d.hue = 170),
                      (a = this.buildSnakePacket(d)),
                      f.updateNetwork(a, 0, true));
            };
            a.clear = function () {
                if (this.isInitialized) {
                    this.isInitialized = false;
                    void 0 != y[x] && (y[x].cleanup(), delete y[x]);
                    void 0 != y[B] && (y[B].cleanup(), delete y[B]);
                    for (var a = m.length, b = 0; b < a; b++) void 0 != y[m[b].id] && delete y[m[b].id];
                }
            };
            a.init = function () {
                g = h = 0;
                e = 8;
                b = -4;
                l = 0;
                q = 0.5;
                s = n = 0;
                u = 15;
                t = 99999;
                m = [];
                G = D = false;
                E = 0;
                I = false;
                z = 0;
                this.initSnake(0);
                this.initSnake(1);
                this.isInitialized = true;
            };
        },
        Dc = "crash",
        yc = "spark",
        Cc = "electroloop",
        Ac = "lineloop",
        Bc = "lineloopfast",
        Fc = "foodgrab",
        gc = "turn",
        sa = 0,
        cc = 3,
        Ec = 0.2,
        zc = 0.6,
        xc = 1,
        ec = 0.05,
        vc = 0.8,
        wc = 1.4,
        Gc = 0.3,
        hc = 0.6,
        Nc = function () {
            this.sound;
            var a = false,
                c = {},
                f = {
                    crash: [0, 804.0589569160998],
                    electroloop: [2e3, 1821.1791383219954, 1],
                    foodgrab: [5e3, 461.29251700680294],
                    lineloop: [7e3, 2946.1224489795923, 1],
                    lineloopfast: [11e3, 2e3, 1],
                    spark: [14e3, 87.93650793650798],
                    turn: [16e3, 500],
                };
            this.load = function (c) {
                this.sound = new Howl({
                    urls: ["sounds/out.ogg", "sounds/out.m4a", "sounds/out.mp3", "sounds/out.ac3"],
                    sprite: f,
                    onload: function () {
                        a = true;
                        c && c();
                    },
                });
            };
            this.playSound = function (d, h, g, e, b) {
                if (a && gameInFocus) {
                    h *= R;
                    T ? OverlayVisible && (h *= 0.3) : (h = 0);
                    var l = f[d];
                    c[d] || (c[d] = 0);
                    (0 < e && c[d] >= e) ||
                        (this.sound.play(d, function (a) {
                            var c = D.sound._nodeById(a);
                            c && c.bufferSource && (c.bufferSource.playbackRate.value = g);
                            D.sound.volume(h, a);
                            b && b(a);
                        }),
                        (l = l[1]),
                        e != sa && c[d]++,
                        setTimeout(function () {
                            e != sa && c[d]--;
                        }, l));
                }
            };
            this.stop = function (c) {
                a && c.stop();
            };
            this.setVolume = function (a) {
                this.sound.volume(a);
            };
        },
        tc = function () {
            var a = this,
                c;
            this.visible = false;
            var f = 1;
            this.fastHide = function () {
                f = 1;
                this.visible = false;
            };
            this.draw = function (a) {
                f = this.visible ? f + (0 - f) / 10 : f + (1 - f) / 10;
                0.99 < f ||
                    (a.translate(10 + -190 * f, 100),
                    a.scale(q, q),
                    (a.font = "Bold 15px 'proxima-nova-1','proxima-nova-2', Arial"),
                    (a.fillStyle = "rgba(0, 255, 255, 1.0)"),
                    (a.shadowBlur = 5),
                    (a.shadowColor = "rgba(0, 200, 200, 1.0)"),
                    snake && (255 > snake.talkStamina ? (a.fillText("CANT TALK YET", 20, 15), I.drawTalkWaitFx(a, 160, 8, 4, snake.talkStamina / 255), (a.globalAlpha = 0.5)) : a.fillText("PRESS A NUMBER", 20, 15)),
                    (a.shadowBlur = 0),
                    a.drawImage(c, 0, 0),
                    (a.globalAlpha = 1));
            };
            this.preRender = function (a, c) {
                c.width = 180;
                c.height = 333;
                a.font = "Bold 15px 'proxima-nova-1','proxima-nova-2', Arial";
                a.fillStyle = "rgba(0, 255, 255, 1.0)";
                a.shadowBlur = 5;
                a.shadowColor = "rgba(0, 200, 200, 1.0)";
                var f;
                f = 23;
                for (var e = 0; 10 > e; e++) {
                    a.globalAlpha = 0.3;
                    a.fillStyle = "#004444";
                    a.shadowBlur = 0;
                    Ra(a, 0, f + 31 * e, 180, 30, 30);
                    a.globalAlpha = 1;
                    var b = a,
                        l = f + 31 * e,
                        k = 30,
                        k = k / 2;
                    b.beginPath();
                    b.moveTo(0, l + k);
                    b.lineTo(0, l + 30 - k);
                    b.quadraticCurveTo(0, l + 30, 0 + k, l + 30);
                    b.lineTo(35, l + 30);
                    b.lineTo(35, l);
                    b.lineTo(0 + k, l);
                    b.quadraticCurveTo(0, l, 0, l + k);
                    b.closePath();
                    b.fill();
                    a.globalAlpha = 1;
                    a.fillStyle = "rgba(0, 255, 255, 1.0)";
                    a.shadowBlur = 5;
                    a.shadowColor = "rgba(0, 200, 200, 1.0)";
                    b = e + 1;
                    10 == b && (b = 0);
                    a.fillText(b, 15, f + 31 * e + 5 + 15);
                    b = $b[e];
                    l = a.measureText(b).width;
                    a.fillText(b, 107.5 - l / 2, f + 31 * e + 5 + 15);
                }
                a.globalAlpha = 1;
                a.shadowBlur = 0;
            };
            (function () {
                c = x.createElement("canvas");
                var d = c.getContext("2d");
                a.preRender(d, c);
            })();
        };
    s.onload = function () {
        oc();
        Modernizr.canvas && Modernizr.websockets
            ? (null == L &&
                  (s.devicePixelRatio && (sb = 1 < s.devicePixelRatio ? 2 : 1),
                  (L = new Oc(x.getElementById("canvas"))),
                  s.addEventListener("resize", L.resize, false),
                  (mySnake = new rc()),
                  mySnake.addListeners(),
                  s.requestAnimationFrame ? s.requestAnimationFrame(Bb) : setInterval(Bb, 1e3 / 60),
                  k("#overlay").show()),
              L.resize(),
              CheckGraphics())
            : debug && console.log("unsupported-browser!");
    };
})(window, document, jQuery);
