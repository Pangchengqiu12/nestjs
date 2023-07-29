import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';
import consoleImgs from './consoleImages';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('public');
  // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle('管理后台')
    .setDescription('管理后台接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.useGlobalFilters(new HttpExceptionFilter()); //设置全局异常过滤，统一返回错误的格式
  app.useGlobalInterceptors(new TransformInterceptor()); //设置全局拦截器统一成功返回的数据
  app.setGlobalPrefix('api'); // 设置全局路由前缀
  console.log(consoleImgs.fz);
  await app.listen(3000);
}
bootstrap();
