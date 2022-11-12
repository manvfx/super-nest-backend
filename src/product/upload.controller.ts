import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('upload')
@Controller()
export class UploadController {
  @Post('uploads')
  @ApiOperation({ summary: 'Upload product image file' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename(_, file, callback) {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      url: `http://localhost:8000/api/v1/${file.path}`,
    };
  }

  @Get('uploads/:path')
  @ApiOperation({ summary: 'Get product image file' })
  async getImage(@Param('path') path, @Res() res: Response) {
    res.sendFile(path, { root: 'uploads' });
  }
}
