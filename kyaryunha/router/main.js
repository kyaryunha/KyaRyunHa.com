var subdomain = require('express-subdomain');
var express = require('express');
var router = express.Router();

module.exports = function(app)
{
      app.get('/',function(req,res){
         res.render('kyaryunha.html')
      });
      app.get('/kyaryunha',function(req,res){
         res.render('kyaryunha.html')
      });
      app.get('/sleepcomputer',function(req,res){
         res.render('sleepcomputer.html')
      });
      app.get('/arithmetic_archive',function(req,res){
         res.render('arithmetic_archive.html')
      });
      app.get('/arithmetic_explanation',function(req,res){
         res.render('arithmetic_explanation.html')
      });
      app.get('/drawgraph',function(req,res){
         res.render('drawgraph.html')
      });
      app.get('/drawgraph_upgrade',function(req,res){
         res.render('drawgraph_upgrade.html')
      });
      app.get('/drawgraph_introduce',function(req,res){
         res.render('drawgraph_introduce.html')
      });
      app.get('/christmas',function(req,res){
         res.render('christmas.html')
      });
      app.get('/christmas_introduce',function(req,res){
         res.render('christmas_introduce.html')
      });
      app.get('/christmas_manual',function(req,res){
         res.render('christmas_manual.html')
      });
      app.get('/education',function(req,res){
         res.render('education.html')
      });
      app.get('/downloads',function(req,res){
         res.render('downloads.html')
      });
      /*
      router.get('/', function(req, res) {
         res.render('christmas.html');
         });
      app.use(subdomain('christmas',router));
      */
}