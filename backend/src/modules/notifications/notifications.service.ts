import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification) private repo: Repository<Notification>,
  ) {}

  create(
    {
      emailType,
      emailFrom,
      emailTo,
      subject,
      message,
      htmlMessage,
      maxRetryCount,
      status,
    }: Notification,
    user: User,
  ) {
    const notification = this.repo.create({
      emailType,
      emailFrom,
      emailTo,
      subject,
      message,
      htmlMessage,
      maxRetryCount,
      status,
    });

    notification.user = user;
    return this.repo.save(notification);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, noticiationDetails: Partial<Notification>) {
    const notification = await this.findOne(id);

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    Object.assign(notification, noticiationDetails);

    return this.repo.save(notification);
  }
}
