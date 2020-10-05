<template>
  <!-- Class Viewer-->
  <div
    class="tab-pane class-viewer mt-4"
    id="classviewer"
    role="tabpanel"
    aria-labelledby="classviewer-tab"
  >
    <form>
      <div class="form-group">
        <div class="row">
          <div class="col-md-13">
            <h2 class="class-title d-inline">{{ classDetail.name }}</h2>
            <a class="edit-link d-inline f-n-20 ml-2" href="#">Edit</a>
          </div>
          <div class="col-md-11 clearfix">
            <div class="wrap-date float-right">
              <div class="input-group start-date">
                <label class="f-m-14 blue-light ml-3">Start</label>
                <input
                  class="datepicker-enddate"
                  :value="classDetail.startDate"
                  data-date-format="mm/dd/yyyy"
                />
              </div>

              <div class="input-group end-date">
                <label class="f-m-14 blue-light ml-3">End</label>
                <input
                  class="datepicker-startdate"
                  :value="classDetail.endDate"
                  data-date-format="mm/dd/yyyy"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 mb-2 mt-2 f-m-20">Summary</div>
        </div>
        <input
          type="text"
          id=""
          class="form-control"
          :value="classDetail.description"
        />
      </div>
    </form>

    <div class="wrap-course mb-3">
      <h3 class="f-m-20 d-inline blue-bold">Courses</h3>
      <span class="d-inline float-right f-n-14 blue-light mr-4"
        >Hover on any title for more information</span
      >
    </div>
    <div class="wrap-item">
      <div class="scrollbar scrollbar-inner">
        <table class="table table-striped table-custom header-fixed">
          <thead>
            <tr>
              <th class="text-center" scope="col">Accessible</th>
              <th scope="col">Course Name</th>
              <th scope="col">Play Simulations</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(course, index) in classDetail.activeCourse"
              :key="'active-course' + index"
            >
              <td align="center">
                <div class="form-check">
                  <input
                    class="form-check-input position-static"
                    type="checkbox"
                    id="blankCheckbox"
                    value="option1"
                    aria-label="..."
                  />
                </div>
              </td>
              <td class="f-m-18 blue-bold">
                <a
                  href="#course-info"
                  data-toggle="modal"
                  data-target="#course-info"
                  @click="selectedCourse = course"
                  >{{ course.name }}</a
                >
              </td>
              <td><a href="#" class="launch_ap"></a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="wrap-student mb-3">
      <h3 class="f-m-20 d-inline blue-bold">Student List</h3>
      <span class="d-inline float-right f-n-14 mt-1 mr-4 blue-bold"
        ><i class="fa fa-download"></i> Download</span
      >
    </div>
    <div class="wrap-item">
      <div class="scrollbar scrollbar-inner">
        <table class="table table-striped table-custom table-lst-student header-fixed">
          <thead>
            <tr>
              <th class="text-center pl-4 pr-4" scope="col">
                <div class="form-check">
                  <input
                    class="form-check-input position-static"
                    type="checkbox"
                    value="option1"
                    aria-label="..."
                  />
                </div>
              </th>
              <th scope="col">Last Name <i class="fa fa-chevron-down"></i></th>
              <th scope="col">First Name <i class="fa fa-chevron-down"></i></th>
              <th scope="col">Last Login <i class="fa fa-chevron-down"></i></th>
              <th scope="col">Total Time <i class="fa fa-chevron-down"></i></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(student, index) in classDetail.students"
              :key="'active-student' + index"
            >
              <td class="text-center">
                <div class="form-check">
                  <input
                    class="form-check-input position-static"
                    type="checkbox"
                    value="option1"
                    aria-label="..."
                  />
                </div>
              </td>
              <td class="font-weight-bold">
                <a
                  href="javascript:void(0)"
                  @click="$router.push({ name: 'ClassStudent' })"
                  >{{ student.lastName }}</a
                >
              </td>
              <td class="font-weight-bold">{{ student.firstName }}</td>
              <td>{{ student.lastLogin | timeParser }}</td>
              <td>{{ student.totalTime }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="clearfix">
      <a
        href="#delete-class"
        class="float-left f-m-18"
        data-toggle="modal"
        data-target="#delete-class"
      >
        Delete Your Class</a
      >
      <a
        href="#addclass1"
        data-toggle="modal"
        data-target="#addclass1"
        class="btn-created float-right"
        >Add Students</a
      >

      <a
        href="#resent-invitation"
        data-toggle="modal"
        data-target="#resent-invitation"
        class="btn-created btn-red float-right btn-show"
        >Resend Invitation(s)</a
      >

      <a
        href="#removestudent"
        data-toggle="modal"
        data-target="#removestudent"
        class="btn-created btn-red float-right btn-show"
        >Remove Student(s)</a
      >
    </div>

    <!-- Modal-delele-Class -->
    <div
      class="modal fade"
      id="course-info"
      tabindex="-1"
      role="dialog"
      aria-labelledby="course-infoLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title" id="course-infoLabel">Course Objectives</h2>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h3>Select a simulation for more information</h3>
            <div id="accordion">
              <div
                class="card"
                v-for="(simulation, index) in selectedCourse.simulation"
                :key="'simulation' + index"
              >
                <div class="card-header" id="headingOne">
                  <h3 class="mb-0">
                    <button
                      class="btn btn-link"
                      data-toggle="collapse"
                      :data-target="'#simulation' + index"
                      aria-expanded="true"
                      :aria-controls="'simulation' + index"
                    >
                      {{ simulation.name }}
                    </button>
                  </h3>
                </div>

                <div
                  :id="'simulation' + index"
                  class="collapse"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div class="card-body">
                    <div v-html="simulation.description"></div>
                    <!-- <h4 class="f-m-18 blue-bold">
                      CEFR Statements / Students can:
                    </h4>
                    <ul>
                      <li>
                        Understand what people say to me in simple, everyday
                        conversation.
                      </li>
                      <li>Communicate in everyday situations.</li>
                      <li>
                        Politely talk to people in short social exchanges.
                      </li>
                    </ul> -->
                    <table class="table-modal">
                      <thead>
                        <tr>
                          <th scope="col">Objectives</th>
                          <th scope="col">Skills</th>
                        </tr>
                      </thead>
                    </table>
                    <table class="table table-striped table-custom">
                      <tbody>
                        <tr
                          v-for="(Objective, jIndex) in simulation.Objectives"
                          :key="'Objectives' + index + '-' + jIndex"
                        >
                          <td>{{ Objective.name }}</td>
                          <td v-html="Objective.skills">
                            Appetizer Vocabulary<br />Articles with Countable
                            and Uncountable Nouns
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";

export default {
  name: "ClassView",
  data() {
    return {
      selectedCourse: {},
    };
  },
  computed: {
    ...mapGetters(["classDetail"]),
  },
  methods: {
    ...mapActions(["fetchClassDetail"]),
  },
  filters: {
    timeParser(string) {
      return moment(string, "MM/DD/YYYY HH:mm").format("MMMM DD, YYYY HH:mm");
    },
  },
  created() {
    this.fetchClassDetail();
  },
};
</script>

<style>
</style>