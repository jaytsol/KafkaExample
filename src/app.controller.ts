import { Body, Controller, Get, ParseArrayPipe, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PipelineInfoDTO } from './dto/pipeline-info.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Post()
  sendPipelineInfo(
    @Body(new ParseArrayPipe({items: PipelineInfoDTO})) payload: PipelineInfoDTO[],
  ) {
    return this.appService.sendPipelineInfo(payload);
  }
}
