/* tslint:disable no-any completed-docs no-implicit-dependencies no-import-side-effect no-unused-expression function-name */
import { suite, test } from 'mocha-typescript';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';

import * as got from 'got';
import {
  EchoRequest,
  getRequestUrl,
  apiRequest,
} from './request';
import { EmptyEchoRequestError } from './error';

/**
 * Simple tests for pure functions are easiest. These "@test" specs can be async or synchronous
 */
@suite export class GetRequestUrlTest {
  @test 'should throw EmptyEchoRequestError if no request is given'() {
    try {
      getRequestUrl(undefined);

      expect('Should have errored').to.be.true;
    }
    catch (ex) {
      expect(ex instanceof EmptyEchoRequestError).to.be.true;
    }
  }

  @test 'should throw EmptyEchoRequestError if no properties are present on request'() {
    try {
      getRequestUrl({});

      expect('Should have errored').to.be.true;
    }
    catch (ex) {
      expect(ex instanceof EmptyEchoRequestError).to.be.true;
    }
  }
}

/**
 * Stubbing included libraries' methods to make sure they are called correctly isn't too difficult
 */
@suite export class JSONTestRequest {

  private gotGetStub: sinon.SinonStub<any>;

  private readonly API_REQUEST_OPTS: got.GotJSONOptions = { json: true, timeout: 3000 };

  private readonly exampleResponse: got.Response<EchoRequest> = <any> { body: {} };

  // this is a beforeEach()
  before() {
    this.gotGetStub = sinon.stub(got, 'get').resolves(<any> this.exampleResponse);
  }

  // this is an afterEach()
  after() {
    this.gotGetStub.restore();
  }

  @test async 'should call go.get() with the proper request options'() {
    const actual = await apiRequest({ a: 1 });

    expect(actual).to.equal(this.exampleResponse.body);

    expect(this.gotGetStub.getCall(0).args[1]).to.deep.equal(this.API_REQUEST_OPTS);
  }
}
