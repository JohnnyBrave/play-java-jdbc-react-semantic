// @flow
import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import type { FormProps } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";

import {
  Grid,
  Header,
  Form,
  Button,
  Table,
  Icon,
  Modal,
  Message
} from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import InputField from "components/elements/InputField";
import { DateTime } from "react-datetime";
import "react-datetime/css/react-datetime.css";
import TextAreaField from "components/elements/TextAreaField";
import DateTimeField from "components/elements/DateTimeField";
import { getTask, updateTask, TASK_ADD_JOB } from "common/actions/task";
import { createStructuredSelector } from "reselect";

import JobModalSearch from "containers/job/modal_search";

import {
  makeSelectTask,
  makeSelectTaskInitialValues
} from "common/selectors/task";

type Props = FormProps;

const fields = [
  {
    placeholder: "Title",
    name: "title",
    label: "Title",

    component: InputField
  },

  {
    placeholder: "Description",
    name: "description",
    label: "Description",

    component: InputField
  }
];
class TaskEdit extends Component<Props, State> {
  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.dispatch(getTask(this.props.match.params.id));
    }
  }

  render() {
    const {
      handleSubmit,
      submitting,
      submitSucceeded,
      error,
      warning
    } = this.props;

    const jobs = this.props.taskProps.task.jobs;
    var addJob = this.props.addJob.bind(this);

    return (
      <div>
        <Helmet>
          <title>Task</title>
        </Helmet>
        <Grid columns={1}>
          <Grid.Row centered>
            <Grid.Column width={16}>
              <Button>
                <Link
                  to={{
                    pathname: `/task`,
                    state: {}
                  }}
                >
                  Search Task
                </Link>
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              {error && (
                <Message error>
                  <Message.Header />
                  <p>{error}</p>
                </Message>
              )}
              {warning && (
                <Message warning>
                  <Message.Header />
                  <p>{warning}</p>
                </Message>
              )}
              {submitSucceeded &&
                !submitting && (
                  <Message>
                    <Message.Header />
                    <p>Task saved</p>
                  </Message>
                )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={16}>
              <Form>
                <div style={{ textAlign: "left" }}>
                  {jobs &&
                    jobs.length > 0 &&
                    jobs.map((entity, idx) => {
                      return (
                        <Button
                          as={Link}
                          key={entity["_id"] + idx}
                          to={"/viewJob/" + entity["_id"]}
                        >
                          {entity["jobTitle"]}
                        </Button>
                      );
                    })}
                </div>

                <div style={{ textAlign: "right" }}>
                  <JobModalSearch
                    trigger={<Button>Add Job</Button>}
                    title="Add Job"
                    buttonLabel="Add Job"
                    buttonAction={addJob}
                    closeIcon
                  >
                    <Header icon="archive" content="Add Job" />
                    <Modal.Content>
                      <p>Add Job</p>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button color="red">
                        <Icon name="remove" /> No
                      </Button>
                      <Button color="green">
                        <Icon name="checkmark" /> Yes
                      </Button>
                    </Modal.Actions>
                  </JobModalSearch>
                </div>

                {fields.map((a, i) => <Field key={i} {...a} />)}

                <div style={{ textAlign: "right" }}>
                  <Button
                    className="save-button"
                    content="Save"
                    icon="save"
                    onClick={handleSubmit(values =>
                      this.props.save({
                        ...values,

                        jobs: jobs,

                        action: "save"
                      })
                    )}
                  />
                </div>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state =>
  createStructuredSelector({
    taskProps: makeSelectTask(),
    initialValues: makeSelectTaskInitialValues()
  });

const mapDispatchToProps = dispatch => ({
  async save(data) {
    console.log(data);
    return dispatch(updateTask(data));
  },

  addJob(job) {
    console.log("addJob");
    TASK_ADD_JOB(job, dispatch);
  }
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(
  reduxForm({ form: "TASK_EDIT_FORM", enableReinitialize: true })(TaskEdit)
);
