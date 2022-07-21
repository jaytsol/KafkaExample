import { Injectable } from '@nestjs/common';
import { CompressionTypes } from 'kafkajs';
import { PipelineInfoDTO } from './dto/pipeline-info.dto';
import { ProducerService } from './kafka/producer.service';
import { plainToInstance } from 'class-transformer'

@Injectable()
export class AppService {
  constructor(private readonly producerService: ProducerService) {}

  async getHello() {
    await this.producerService.produce({
      topic: 'test',
      messages: [
        {
          key: 'my-key',
          value: 'my-value',
        },
      ],
    });
    return 'Success';
  }

  async sendPipelineInfo(payload: PipelineInfoDTO[]) {
    const pipelineInfo = plainToInstance(PipelineInfoDTO, payload);

    await this.producerService.produce({
      topic: 'test_json',
      messages: [
        {
          key: 'my-key',
          value: JSON.stringify(pipelineInfo, null, 2),
          headers: {
            'metadata1': 'extra-metadata like 2bfb68bb-893a-423b-a7fa-7b568cad5b67',
            'system-id': 'my-system',
          },
        },
      ],
      compression: CompressionTypes.GZIP,
      acks: 1,
      timeout: 30000,
    });
    return 'send-pipeline-info success';
  }
}


