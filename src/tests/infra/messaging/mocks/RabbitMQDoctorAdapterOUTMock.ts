import { IUserQueueAdapterOUT } from "../../../../core/messaging/IUserQueueAdapterOUT"

export default class RabbitMQDoctorAdapterOUTMock implements IUserQueueAdapterOUT {
  
  constructor(private param1: any, private param2: any) {
    this.param1 = param1;
    this.param2 = param2;
  }

  connect = jest.fn().mockResolvedValue(undefined);
  publish = jest.fn().mockResolvedValue({});
  close = jest.fn().mockResolvedValue(undefined);
}