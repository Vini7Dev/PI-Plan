import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IDateProvider from '../../../shared/container/providers/DateProvider/models/IDateProvider';
import IOrdersRepository from '../../orders/repositories/IOrdersRepository';
import IAssemblersRepository from '../../users/repositories/IAssemblersRepository';
import IInstallationsRepository from '../repositories/IInstallationsRepository';
import Installation from '../typeorm/entities/Installation';

interface IAssemblersRelation {
  assembler_id: string;
  commission_percentage: number;
}

interface IRequest {
  order_id: string;
  done: boolean;
  start_date: string;
  end_date?: string;
  completion_forecast: string;
  price: number;
  assemblers_installation: IAssemblersRelation[];
}

@injectable()
class CreateInstallationsService {
  constructor(
    // Repositório dos pedidos, das instalações e dos montadores
    @inject('InstallationsRepository')
    private installationsRepository: IInstallationsRepository,

    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('AssemblersRepository')
    private assemblersRepository: IAssemblersRepository,

    // Provetor para trabalhar com datas
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  public async execute({
    order_id,
    done,
    start_date,
    end_date,
    completion_forecast,
    price,
    assemblers_installation,
  }: IRequest): Promise<Installation> {
    // Verificar se a data de início é menor que a de finalização e da previsão para finalização
    const startDateParsed = this.dateProvider.parseStringDate(start_date);
    const endDateForecastParsed = this.dateProvider.parseStringDate(completion_forecast);
    const startDateIsBeforeEndDateForecast = this.dateProvider.isBefore(
      startDateParsed, endDateForecastParsed,
    );

    if (!startDateIsBeforeEndDateForecast) {
      throw new AppError('Start date must be before than end date forecast.');
    }

    if (end_date) {
      const endDateParsed = this.dateProvider.parseStringDate(end_date);
      const startDateIsBeforeEndDate = this.dateProvider.isBefore(startDateParsed, endDateParsed);

      if (!startDateIsBeforeEndDate) {
        throw new AppError('Start date must be before than end date.');
      }
    }

    // Verificando se o pedido existe
    const orderFinded = await this.ordersRepository.findById(order_id);

    if (!orderFinded) {
      throw new AppError('Order not found.', 404);
    }

    // Verificando se os montadores informados existem
    const assemblersIds = assemblers_installation.map((assmb_inst) => assmb_inst.assembler_id);

    const assemblersFinded = await this.assemblersRepository.findManyById(assemblersIds);

    if (assemblersFinded.length !== assemblers_installation.length) {
      throw new AppError('Assembler not found.', 404);
    }

    // Salvando os dados da instalação
    const createdInstallation = await this.installationsRepository.create({
      order_id,
      done,
      start_date,
      end_date,
      completion_forecast,
      price,
      assemblers_installation,
    });

    return createdInstallation;
  }
}

export default CreateInstallationsService;
