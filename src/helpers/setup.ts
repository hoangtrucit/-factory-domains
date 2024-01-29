import { Transport } from '@nestjs/microservices';

export const getGRPC = () => {
  return {
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${process.env.PORT || '50051'}`,
      package: ['app.payment.user.service.v1'],
      protoPath: [
        // base
        'app/payment/base/user/v1/user.proto',

        // service
        'app/payment/user/service/v1/user.proto',
      ],
      loader: {
        includeDirs: ['./node_modules/@clv-factory/protobuf/dist'],
        defaults: true,
      },
    },
  };
};
