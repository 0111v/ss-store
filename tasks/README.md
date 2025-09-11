# SS-STORE Task Management System

## Overview
This folder contains task specifications for coordinated development between Claude instances. Each task is a markdown file with detailed specifications, success criteria, and execution notes.

## Workflow

### 1. Task Creation (Coordinator)
- Create new task file: `XX-task-name.md`
- Include detailed specifications and acceptance criteria
- Assign status and priority

### 2. Task Execution (Developer Instances)
- Update task status to "In Progress"
- Add implementation notes and decisions
- Mark completion when done

### 3. Task Review (Coordinator)
- Review implementation against specifications
- Provide feedback and approve/request changes
- Move completed tasks to `completed/` folder

## Task Statuses
- **Draft** - Initial task creation
- **Ready** - Specifications complete, ready for assignment
- **In Progress** - Currently being worked on
- **Review** - Implementation complete, awaiting review
- **Completed** - Approved and moved to completed/
- **Blocked** - Waiting for dependencies or clarification

## Task File Template

```markdown
# Task XX: [Task Name]

## Status: [Draft/Ready/In Progress/Review/Completed/Blocked]
## Priority: [High/Medium/Low]
## Assignee: [Instance name or "Unassigned"]
## Created: YYYY-MM-DD
## Updated: YYYY-MM-DD
## Estimated Time: [X hours]

## Objective
Brief description of what needs to be accomplished.

## Requirements
- [ ] Requirement 1
- [ ] Requirement 2
- [ ] Requirement 3

## Files Affected
- `path/to/file1.tsx` - Description of changes
- `path/to/file2.ts` - Description of changes

## Success Criteria
- [ ] Criteria 1
- [ ] Criteria 2
- [ ] All tests pass
- [ ] No linting errors

## Implementation Notes
[Space for developer to add notes during implementation]

## Review Notes
[Space for coordinator feedback]

## Dependencies
- Depends on: Task XX
- Blocks: Task YY
```

## Archive Policy
- Completed tasks are moved to `completed/` with original filename
- Keep task history for reference and learning
- Review completed tasks periodically for patterns

## Best Practices
1. **Be Specific** - Include exact file paths and expected changes
2. **Define Success** - Clear, testable acceptance criteria
3. **Track Progress** - Update status and notes regularly
4. **Document Decisions** - Record why choices were made
5. **Test Everything** - Include verification steps