import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {

  constructor(
    private readonly productsService: ProductsService,
  ){}
  
  runSeed(){
    this.insertNewProducts();
    return 'Seed execute'
  }

  private async insertNewProducts(){
    await this.productsService.deleteAllProducts();


    const products = initialData.products;

    const insertpromises = [];

    products.forEach( product => {
      insertpromises.push(this.productsService.create( product ));
    });

    await Promise.all( insertpromises );

    return true;
  }
}
