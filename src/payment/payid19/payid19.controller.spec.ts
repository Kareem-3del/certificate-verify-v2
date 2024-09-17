import { Test, TestingModule } from '@nestjs/testing';
import { Payid19Controller } from './payid19.controller';
import { Payid19Service } from './payid19.service';

describe('Payid19Controller', () => {
  let controller: Payid19Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Payid19Controller],
      providers: [Payid19Service],
    }).compile();

    controller = module.get<Payid19Controller>(Payid19Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
