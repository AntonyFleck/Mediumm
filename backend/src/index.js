"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hono_1 = require("hono");
var user_1 = require("./routes/user");
var blog_1 = require("./routes/blog");
var app = new hono_1.Hono();
app.route('/api/v1/user', user_1.user);
app.route('/api/v1/blog', blog_1.blog);
exports.default = app;
