'use strict';
var MagicTest = require('vmagic/test/MagicTest');
var magicTest = new MagicTest();
const {assert} = require('chai');

var examplesControllerMock = null;
var exampleModelMock = null;

before(function () {
    examplesControllerMock = magicTest.controllerTest('Examples');
    exampleModelMock = magicTest.modelTest("Example");
});

describe('Should authenticate user',function () {
    it('Do login',function (done) {
        var random = Math.floor(Math.random() * 10000);
        var dataUser = {
            "name" : `user find test  ${random}`,
            "username" : `user.find.test ${random}`,
            "password" : `password.find.test  ${random}`,
            "code" : "123"
        };

        exampleModelMock.save(dataUser).then(() => {
            examplesControllerMock.query = {
                "username" : dataUser.username,
                "password" : dataUser.password
            };
            examplesControllerMock.get(result => {
                assert.isTrue(result.length > 0);
                done();
            });
        });
    });
});
