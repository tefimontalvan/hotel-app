import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadGatewayException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { History } from 'src/history/history.entity';
import { Room } from '../room.entity';

async function saveHistory(value: Room) {
  if (value.empty) {
    const id = value.id;
    const historyFindArray = await History.createQueryBuilder('history')
      .leftJoinAndSelect('history.room', 'history_room')
      .where('history.room = :id', { id })
      .getMany();

    const lenght = historyFindArray.length;
    const historyFind = historyFindArray[lenght - 1];

    const historyUpdated = {
      ...historyFind,
      checkOut_at: new Date(Date.now()),
    };
    History.update(historyFind?.id, historyUpdated);
  } else {
    const id = value.id;
    const clientFind = await Room.createQueryBuilder('room')
      .leftJoinAndSelect('room.client', 'room_client')
      .where('room.id = :id', { id })
      .getMany();

    const newHistory = new History();
    newHistory.room = value;
    newHistory.client = clientFind[0].client;
    newHistory.checkIn_at = new Date(Date.now());
    newHistory.checkOut_at = new Date(Date.now());
    await newHistory.save();
  }
}

@Injectable()
export class HistoryInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      tap((value: Room) => {
        saveHistory(value);
      }),
      catchError((err) => throwError(new BadGatewayException(err))),
    );
  }
}
