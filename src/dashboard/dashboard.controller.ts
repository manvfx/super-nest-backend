import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from 'src/category/category.service';
import { ManagerService } from 'src/manager/manager.service';
import { ProductService } from 'src/product/product.service';
import { SellerService } from 'src/seller/seller.service';
import { ShopService } from 'src/shop/shop.service';
import { UserService } from 'src/user/user.service';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private shopService: ShopService,
    private sellerService: SellerService,
    private managerService: ManagerService,
  ) {}

  @Get('statistics')
  @ApiOperation({ summary: 'Show dashboard statistics' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async statistics() {
    let count_total_manager = await this.managerService.countTotalManager();
    let count_total_seller = await this.sellerService.countTotalSeller();
    let count_total_user = await this.userService.countTotalUser();
    let count_total_shop = await this.shopService.countTotalShop();
    let count_total_category = await this.categoryService.countTotalCategory();
    let count_total_product = await this.productService.countTotalProduct();

    return {
      totalManagers: count_total_manager,
      totalSellers: count_total_seller,
      totalUsers: count_total_user,
      totalShops: count_total_shop,
      totalCategories: count_total_category,
      totalProducts: count_total_product,
    };
  }
}
