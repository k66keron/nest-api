import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DeleteResult, Between, In } from 'typeorm'
import { Invoice } from './entity/invoice.entity'

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}

  async createOrUpdate(invoice: Invoice): Promise<Invoice> {
    return await this.invoiceRepository.save(invoice)
  }

  async findOne(invoiceNo: string): Promise<Invoice> {
    return await this.invoiceRepository.findOne({ invoiceNo: invoiceNo })
  }

  async findAll(invoiceNo: string, customerId: string, dateBegin: Date, dateUntil: Date, status: string): Promise<Invoice[]> {
    const query = [
      {
        key: 'invoiceNo',
        value: invoiceNo
      },
      {
        key: 'customerId',
        value: customerId
      },
      {
        key: 'date',
        value: dateBegin && dateUntil ? Between(dateBegin , dateUntil) : ''
      },
      {
        key: 'status',
        value: typeof status === 'object' ? In(status) : status ? In([status]) : ''
      },
    ]
    const find = {}
    query.forEach(element => {
      if (element.value) find[element.key] = element.value
    })
    return await this.invoiceRepository.find(find)
  }

  async delete(invoiceNo: string): Promise<DeleteResult> {
    return await this.invoiceRepository.delete({ invoiceNo: invoiceNo })
  }
}