import HorizontalScrollBarHandler from './horizontal_scroll_bar_handler.js';

export default function () {
  function compareDates() {
    var startDate = $('.datepicker-startdate').first().datepicker('getDate');
    var endDate = $('.datepicker-enddate').first().datepicker('getDate');

    $('.date-error-message').text(startDate && endDate && startDate > endDate && "Start Date should not be before End Date" || "")
  }

  return {
    initJs() {
      $('.datepicker-startdate').datepicker();
      $('.datepicker-enddate').datepicker();
      $(document).on('change', '.datepicker-startdate, .datepicker-enddate', compareDates);
      $('.scrollbar-inner').scrollbar();
      $('[data-toggle="tooltip"]').tooltip();

      $("div[id^='addclass']").each(function () {

        var currentModal = $(this);

        //click next
        currentModal.find('.btn-invite').click(function () {
          currentModal.modal('hide');
          currentModal.closest("div[id^='addclass']").nextAll("div[id^='addclass']").first().modal('show');
        });

        //click prev
        currentModal.find('.btn-add-more').click(function () {
          currentModal.modal('hide');
          currentModal.closest("div[id^='addclass']").prevAll("div[id^='addclass']").first().modal('show');
        });

      });

      autosize($('.auto-size'));
    },

    initListScrollbar() {
      $('.class-list .scrollbar-list').scrollbar();
    },
    
    initHorizontalScrollBar() {
      new HorizontalScrollBarHandler($('.nav-tab-course')).perform();
    }
  }
}
