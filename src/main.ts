import { NestFactory } from '@nestjs/core';
import { CitadelModule } from './citadel.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(CitadelModule);

  const config = new DocumentBuilder()
    .setTitle('Citadel')
    .setDescription('Citadel Hackathon API')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
