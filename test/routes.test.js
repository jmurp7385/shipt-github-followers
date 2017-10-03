"user strict";

// var express = require('express');
// var app = express();
var app = require('../app');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;

chai.use(chaiHttp);

describe('Routes', function() {
  describe('index', function() {
    it('should have a 200 response', function() {
      chai.request(app)
          .get('/')
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(/Shipt App/)
          })
    });
  });
  describe('users', function() {
    it('should have a 200 response', function() {
      chai.request(app)
          .post('/users')
          .send({username: 'jmurp7385'})
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
          });
    });
  });
  describe('load_more', function() {
    it('should have a 200 response', function() {
      chai.request(app)
          .post('/load_more')
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
          });
    });
  });
});
