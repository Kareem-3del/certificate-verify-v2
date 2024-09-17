import { Test, TestingModule } from '@nestjs/testing';
import { Payid19Service } from './payid19.service';

describe('Payid19Service', () => {
  let service: Payid19Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Payid19Service],
    }).compile();

    service = module.get<Payid19Service>(Payid19Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
