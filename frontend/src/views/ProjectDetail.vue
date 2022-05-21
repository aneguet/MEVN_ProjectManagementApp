<template>
  <div class="rcolumn">
    <!-- Name, Description, Stakeholder -->
    <Fieldset id="project-name">
      <template #legend>
        {{ project.name }}
      </template>
      <!-- Project state -->
      <div id="tag-style">
        <Tag :severity="projectStateClass"> {{ projectState }} </Tag>
      </div>
      <div>
        <span class="pi pi-briefcase icon-weight"></span>&nbsp;&nbsp;<strong>{{
          project.stakeholder
        }}</strong>
      </div>
      {{ project.description }}
    </Fieldset>
    <!-- Time schedule -->
    <Panel id="project-schedule">
      <template #header> Time Schedule </template>
      <!-- Remaining hours -->
      <div v-if="remainingHours > 0">
        <ProgressBar :value="remainingHPercentage" class="remain-hours"
          >{{ remainingHours }} h</ProgressBar
        >
        <p><span>Estimated:</span> {{ timeSchedule.estimated_hours }} h</p>
      </div>
      <p v-else>
        <span>Remaining:</span> 0h&nbsp;&nbsp;<span>Estimated:</span>
        {{ timeSchedule.estimated_hours }} h
      </p>

      <!-- Dates -->
      <div>
        <div class="date-margin">
          <span class="date-span-margin">Start date:</span
          >{{
            moment(String(timeSchedule.start_date)).format('DD/MM/YYYY hh:mm')
          }}
        </div>
        <div class="date-margin">
          <span class="date-span-margin">End date:</span
          >{{
            moment(String(timeSchedule.end_date)).format('DD/MM/YYYY hh:mm')
          }}
        </div>
        <div>
          <span class="date-span-margin">Due date:</span
          >{{
            moment(String(timeSchedule.due_date)).format('DD/MM/YYYY hh:mm')
          }}
        </div>
      </div>
    </Panel>
    <!-- Technologies -->
    <Panel id="project-techs">
      <template #header> Technologies </template>
      <div class="flex align-items-center flex-column sm:flex-row">
        <i v-if="project.technologies && project.technologies.length == 0">
          No technologies yet.
        </i>
        <Tag
          class="mr-2"
          :value="tech.tech_name"
          rounded
          v-for="tech in project.technologies"
          :key="tech._id"
        ></Tag>
      </div>
    </Panel>
    <!-- Members -->
    <Panel id="project-members">
      <template #header> Members </template>
      <div class="flex align-items-center flex-column sm:flex-row">
        <Chip
          v-for="member in project.members"
          :key="member.member_id._id"
          :label="member.member_id.email"
          :image="member.member_id.avatar"
          v-bind:class="
            member.member_id._id == projectLeader ? 'chip leader-color' : 'chip'
          "
        />
      </div>
    </Panel>
  </div>
</template>

<script>
import projectcrud from '../modules/projectcrud';
import { onMounted } from 'vue';

export default {
  name: 'ProjectDetail',
  setup() {
    const {
      GetProjectById,
      project,
      projectLeader,
      timeSchedule,
      remainingHours,
      remainingHPercentage,
      projectState,
      projectStateClass,
    } = projectcrud();
    var moment = require('moment'); // date formatting package

    onMounted(() => {
      GetProjectById();
    });

    console.log(projectState);
    return {
      project,
      projectLeader,
      timeSchedule,
      moment,
      remainingHours,
      remainingHPercentage,
      projectState,
      projectStateClass,
    };
  },
};
</script>

<style scoped>
.rcolumn {
  margin: 56px 100px;
  height: 100vh;
  flex: auto;
  width: auto;
}
.rcolumn fieldset,
.rcolumn .p-panel.p-component {
  margin-bottom: 1em;
}
#project-name .icon-weight {
  font-weight: bolder;
}
.p-fieldset .p-fieldset-legend {
  /*¿¿¿¿¿¿¿¿¿¿¿¿¿*/
  font-size: 20px;
}

#project-members .chip {
  margin-right: 0.4em;
  margin-bottom: 0.4em;
}
.leader-color {
  background-color: #af92ff;
}
.p-tag.p-tag-rounded {
  margin-right: 0.5em;
}
#project-schedule div {
  align-items: center;
  display: flex;
}
.date-margin {
  margin-right: 1em;
}
.date-span-margin {
  margin-right: 0.5em;
}
.remain-hours {
  width: 15%;
  margin-bottom: 1em;
}
.p-progressbar.p-component.p-progressbar-determinate.remain-hours {
  margin-bottom: 0;
  margin-right: 1em;
}
#tag-style {
  margin-bottom: 1em;
}
</style>
