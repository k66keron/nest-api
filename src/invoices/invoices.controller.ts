import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    Delete,
    Param,
    HttpStatus,
    HttpCode,
    Query
  } from '@nestjs/common'
  import { InvoicesService } from './invoices.service'
  import { CreateInvoiceDto } from './dto/create-invoice.dto'
  import { Invoice } from './entity/invoice.entity'
  
  @Controller('invoices')
  export class InvoicesController {
    constructor(private readonly InvoiceService: InvoicesService) {}
  
    @Post() // POST /invoices
    @HttpCode(HttpStatus.CREATED)
    async createInvoice(@Body() newInvoice: CreateInvoiceDto): Promise<Invoice> {
      const invoice = new Invoice()
      invoice.invoiceNo = newInvoice.invoiceNo
      invoice.customerId = newInvoice.customerId
      invoice.status = newInvoice.status
      invoice.zone = newInvoice.zone
      invoice.date = newInvoice.date
      invoice.subTotal = newInvoice.subTotal
      invoice.shipping = newInvoice.shipping
      invoice.total = newInvoice.total
      return await this.InvoiceService.createOrUpdate(invoice)
    }
  
    @Get() // GET /invoices
    // async findAll(@Query() param: CreateInvoiceDto): Promise<Invoice[]> {
    //   return this.InvoiceService.findAll({ invoiceNo: param.invoiceNo, customerId: param.customerId })
    // }
    async findAll(
      @Query('invoiceNo') invoiceNo:string,
      @Query('customerId') customerId:string,
      @Query('dateBegin') dateBegin:Date,
      @Query('dateUntil') dateUntil:Date,
      @Query('status') status:string
    ): Promise<Invoice[]> {
      return await this.InvoiceService.findAll( invoiceNo, customerId, dateBegin, dateUntil, status )
    }

    
    @Get(':invoiceNo') // GET /invoices/123
    async findInvoice(@Param('invoiceNo') invoiceNo: string): Promise<Invoice> {
      return await this.InvoiceService.findOne(invoiceNo)
    }

    @Put(':invoiceNo') // PUT /invoices/123
    async updateInvoice(
      @Param('invoiceNo') invoiceNo: string,
      @Body() createInvoiceDto: CreateInvoiceDto,
    ): Promise<Invoice> {
      const invoice = await this.InvoiceService.findOne(invoiceNo)
      invoice.invoiceNo = createInvoiceDto.invoiceNo
      invoice.customerId = createInvoiceDto.customerId
      invoice.status = createInvoiceDto.status
      invoice.zone = createInvoiceDto.zone
      invoice.date = createInvoiceDto.date
      invoice.subTotal = createInvoiceDto.subTotal
      invoice.shipping = createInvoiceDto.shipping
      invoice.total = createInvoiceDto.total
      return await this.InvoiceService.createOrUpdate(invoice)
    }
  
    @Delete(':invoiceNo')  // DELETE /invoices/123
    async deleteAlbum(@Param('invoiceNo') invoiceNo: string): Promise<any> {
      await this.InvoiceService.delete(invoiceNo)
      return { success: true }
    }
  }