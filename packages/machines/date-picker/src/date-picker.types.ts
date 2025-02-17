import type {
  Calendar,
  CalendarDate,
  CalendarDateTime,
  DateDuration,
  DateFormatter,
  DateValue,
  ZonedDateTime,
} from "@internationalized/date"
import type { StateMachine as S } from "@zag-js/core"
import type { LiveRegion } from "@zag-js/live-region"
import type { CommonProperties, Context, DirectionProperty, RequiredBy } from "@zag-js/types"

type ChangeDetails<T = {}> = T & {
  value: DateValue[]
}

type IntlMessages = {
  placeholder: (locale: string) => { year: string; month: string; day: string }
}

type ElementIds = Partial<{
  grid(id: string): string
  header: string
  content: string
  cellTrigger(id: string): string
  prevTrigger(view: DateView): string
  nextTrigger(view: DateView): string
  viewTrigger(view: DateView): string
  clearTrigger: string
  control: string
  input: string
  trigger: string
  monthSelect: string
  yearSelect: string
}>

export type SelectionMode = "single" | "multiple" | "range"

export type Offset = {
  amount: number
  visibleRange: { start: DateValue; end: DateValue }
}

export type DayCellProps = {
  value: DateValue
  disabled?: boolean
  offset?: Offset
}

export type MachineState = {
  tags: "open" | "closed"
  value: "idle" | "focused" | "open"
}

export type GridProps = {
  view?: DateView
  columns?: number
  id?: string
}

export type CellProps = {
  disabled?: boolean
  value: number
}

type PublicContext = DirectionProperty &
  CommonProperties & {
    /**
     * The localized messages to use.
     */
    messages?: IntlMessages
    /**
     * The ids of the elements in the date picker. Useful for composition.
     */
    ids?: ElementIds
    /**
     * The `name` attribute of the input element.
     */
    name?: string
    /**
     * The locale (BCP 47 language tag) to use when formatting the date.
     */
    locale: string
    /**
     * The time zone to use
     */
    timeZone: string
    /**
     * Whether the calendar is disabled.
     */
    disabled?: boolean
    /**
     * Whether the calendar is read-only.
     */
    readOnly?: boolean
    /**
     * The minimum date that can be selected.
     */
    min?: DateValue
    /**
     * The maximum date that can be selected.
     */
    max?: DateValue
    /**
     * Whether the calendar should be displayed inline.
     */
    inline?: boolean
    /**
     * The selected date(s).
     */
    value: DateValue[]
    /**
     * The focused date.
     */
    focusedValue: DateValue
    /**
     * The number of months to display.
     */
    numOfMonths: number
    /**
     * The first day of the week.
     *  `0` - Sunday
     *  `1` - Monday
     *  `2` - Tuesday
     *  `3` - Wednesday
     *  `4` - Thursday
     *  `5` - Friday
     *  `6` - Saturday
     */
    startOfWeek?: number
    /**
     * Whether the calendar should have a fixed number of weeks.
     * This renders the calendar with 6 weeks instead of 5 or 6.
     */
    fixedWeeks?: boolean
    /**
     * Function called when the value changes.
     */
    onChange?: (details: ChangeDetails) => void
    /**
     * Function called when the focused date changes.
     */
    onFocusChange?: (details: ChangeDetails<{ focusedValue: DateValue; view: DateView }>) => void
    /**
     * Function called when the view changes.
     */
    onViewChange?: (details: { view: DateView }) => void
    /**
     * Returns whether a date of the calendar is available.
     */
    isDateUnavailable?: (date: DateValue, locale: string) => boolean
    /**
     * The selection mode of the calendar.
     * - `single` - only one date can be selected
     * - `multiple` - multiple dates can be selected
     * - `range` - a range of dates can be selected
     */
    selectionMode: SelectionMode
    /**
     * The format of the date to display in the input.
     */
    format?: (date: DateValue[]) => string
    /**
     * The format of the date to display in the input.
     */
    parse?: (value: string) => DateValue[]
    /**
     * The view of the calendar
     * @default "day"
     */
    view: DateView
    /**
     * Whether the calendar should be modal. This means that the calendar will
     * block interaction with the rest of the page, and trap focus within it.
     */
    modal?: boolean
  }

export type DateView = "day" | "month" | "year"

export type ViewProps = {
  view?: DateView
}

type PrivateContext = Context<{
  startValue: DateValue
  hasFocus?: boolean
  announcer?: LiveRegion
  valueText: string
  inputValue: string
  hoveredValue: DateValue | null
  /**
   * The index of the currently active date.
   * Used in range selection mode.
   */
  activeIndex: number
}>

type ComputedContext = Readonly<{
  /**
   * @computed
   * The end date of the current visible duration.
   */
  endValue: DateValue
  /**
   * @computed
   * Whether the calendar is interactive.
   */
  isInteractive: boolean
  /**
   * @computed
   * The duration of the visible range.
   */
  visibleDuration: DateDuration
  /**
   * @computed
   * The start/end date of the current visible duration.
   */
  visibleRange: { start: DateValue; end: DateValue }
  /**
   * @computed
   * The text to announce when the visible range changes.
   */
  visibleRangeText: { start: string; end: string; formatted: string }
  /**
   * @computed
   * Whether the next visible range is valid.
   */
  isNextVisibleRangeValid: boolean
  /**
   * @computed
   * Whether the previous visible range is valid.
   */
  isPrevVisibleRangeValid: boolean
}>

export type UserDefinedContext = RequiredBy<PublicContext, "id">

export type MachineContext = PublicContext & PrivateContext & ComputedContext

export type State = S.State<MachineContext, MachineState>

export type Send = S.Send<S.AnyEventObject>

export type { Calendar, DateDuration, DateValue, DateFormatter, CalendarDate, CalendarDateTime, ZonedDateTime }
