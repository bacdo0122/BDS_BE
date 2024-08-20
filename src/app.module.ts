import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomConfigModule } from './config/customConfig.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from '../ormconfig';
import { UserModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RegionModule } from './modules/region/region.module';
import { ListingModule } from './modules/listing/listing.module';
import { TypeListingModule } from './modules/typeListing/typeListing.module';
import { CategoryNewsModule } from './modules/categoryNews/categoryNews.module';
import { NewsModule } from './modules/news/news.module';
import { ListingCategoryModule } from './modules/categoryListing/categoryListing.module';
import { DistrictModule } from './modules/district/district.module';
import { WardModule } from './modules/ward/ward.module';
import { DirectionModule } from './modules/direction/direction.module';

@Module({
  imports: [UserModule, CategoryNewsModule,DirectionModule,ListingCategoryModule ,WardModule,DistrictModule, NewsModule, TypeListingModule, ListingModule,AuthModule,TypeListingModule , RegionModule ,CustomConfigModule, TypeOrmModule.forRoot(AppDataSource.options)],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}
