Sketch.create({
    autoclear: false,
    setup: function setup() {
        this.points = [];

        for (var i = 0; i < 20; i++) {
            this.points.push({
                width: 50,
                height: 50,
                color: random(["rgba(231,29,54,0.1)", "rgba(231,29,54,0.1)", "rgba(0,223,252,0.1)"]),
                x: this.canvas.clientWidth / 2,
                y: this.canvas.clientHeight / 2,
                radius: 1,
                vx: 0,
                vy: 0
            });
        }
    },
    mousemove: function mousemove() {
        //Let first point follow mouse
        this.points[0].x = this.mouse.x;
        this.points[0].y = this.mouse.y;
    },
    draw: function draw() {
        this.globalCompositeOperation = 'lighter';
        this.calcCirclePos();
        //Draw points
        //this.points.forEach(this.drawCircle.bind(this));
        //Draw line
        this.points.forEach(this.drawLines.bind(this));
    },
    drawCircle: function drawCircle(el, i, arr) {
        this.fillStyle = el.color;
        this.beginPath();
        this.arc(el.x, el.y, el.radius, 0, Math.PI * 2);
        this.closePath();
        this.fill();
    },
    calcCirclePos: function calcCirclePos() {
        var distance = 90;
        for (var i = 1; i < this.points.length; i++) {
            var pp = this.points[i - 1];
            var p = this.points[i];

            var dx = p.x - pp.x;
            var dy = p.y - pp.y;
            var dd = Math.sqrt(dx * dx + dy * dy);
            var angle = atan2(dy, dx);

            p.vx *= 0.9;
            p.vy *= 0.9;
            p.x += p.vx;
            p.y += p.vy;

            var ox = p.x;
            var oy = p.y;

            if (dd > distance) {
                p.x = pp.x + distance * cos(angle);
                p.y = pp.y + distance * sin(angle);

                p.vx += (p.x - ox) * 0.1;
                p.vy += (p.y - oy) * 0.1;
            }
        }
    },
    drawLines: function drawLines(el, i, arr) {
        if (arr[i + 1]) {
            var next = arr[i + 1];
            this.beginPath();
            this.moveTo(el.x, el.y + el.radius);
            this.lineTo(next.x, next.y - el.radius);
            this.strokeStyle = el.color;
            this.stroke();
        }
    },

    keydown: function keydown() {
        if (this.keys.SPACE) this.reset();
        if (this.keys.C) this.clear();
    }
});