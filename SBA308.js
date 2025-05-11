
// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];




























//------------------------------------------------------------------------------------------------------





function getLearnerData(course, ag, submissions) {
  // Validate that the assignment group belongs to the course
  if (ag.course_id !== course.id) {
    throw new Error("AssignmentGroup does not belong to the specified course.");
  }else{
    const result = [];
    const learners = {};
    const currentDate = new Date();
    // Process each submission
  submissions.forEach(submission => {
    const assignment = ag.assignments.find(a => a.id === submission.assignment_id);
    
    // Skip if assignment doesn't exist or is not yet due
    if (!assignment || new Date(assignment.due_at) > currentDate) {
      return;
    }

    const learnerId = submission.learner_id;
    const submittedAt = new Date(submission.submission.submitted_at);
    const dueAt = new Date(assignment.due_at);
    const isLate = submittedAt > dueAt;
    
    // Calculate late penalty (10% deduction)
    let score = submission.submission.score;
    if (isLate) {
      score = Math.max(0, score - (assignment.points_possible * 0.1));
    }

    // Calculate the ratio
    const ratio = score / assignment.points_possible;

    // Initialize learner data if not exists
    let xx = !learners[learnerId]; // this is a boolean variable
    //i kmow it will make more sence to use the if statement but i have to use a switch in the programm
      switch(xx){
        case true:
          learners[learnerId] = {
            id: learnerId,
            totalScore: 0,
            totalPossible: 0,
            assignments: {},
            
        }
        break;
    
    }

    // Add to the learner's totals
    learners[learnerId].totalScore += score;
    learners[learnerId].totalPossible += assignment.points_possible;
    learners[learnerId].assignments[assignment.id] = ratio;
  });

  // in this loop i convert the learner object to the final result
  for (const learnerId in learners) {
    const learner = learners[learnerId];
    if (learner.totalPossible > 0) {
      const avg = learner.totalScore / learner.totalPossible;
      result.push({
        id: parseInt(learnerId),
        avg: parseFloat(avg.toFixed(3)),
        ...learner.assignments
      });
    }
  }

  return result;
  }

  

  
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);