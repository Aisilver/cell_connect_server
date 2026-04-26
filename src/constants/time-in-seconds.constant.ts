class TimeConstant {
  readonly SECOND = 1;

  readonly SECOND_MS = 1000; 

  readonly MINUTE = this.SECOND * 60;

  readonly MINUTE_MS = this.SECOND_MS * 60;

  readonly HOUR = this.MINUTE * 60;

  readonly HOUR_MS = this.MINUTE_MS * 60;

  readonly DAY = this.HOUR * 24;

  readonly DAY_MS = this.HOUR_MS * 24;

  readonly WEEK = this.DAY * 7;

  readonly WEEK_MS = this.DAY_MS * 7;

  readonly MONTH = this.DAY * 30;

  readonly MONTH_MS = this.DAY_MS * 30;
}

export const TIME_IN_SECONDS_CONSTANT = new TimeConstant()