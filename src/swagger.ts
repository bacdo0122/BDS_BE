import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger'
import {NestExpressApplication} from '@nestjs/platform-express'

const config = new DocumentBuilder().setTitle("BDS APIs").setDescription("The BDS APIS Discriptions")
.setVersion('1.0').addTag("BDS").addBearerAuth().build();

export const initSwagger = (app: NestExpressApplication) => {
    const document = SwaggerModule.createDocument(app,config);
    SwaggerModule.setup("/apis", app, document);
}