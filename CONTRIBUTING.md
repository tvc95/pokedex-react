# Contribution guidelines

## Getting started

First off, I'd like to thank you for taking the time to contribute and make this a better project!

This is a set of instructions and guidelines to reduce misunderstandings and make the process of contributing to `pokedex-react` as smooth as possible.

I hope this guide makes the contribution process clear and answers any questions you may have.

### Language

Please, while contributing or interacting in any way in this project, refrain from using any language other than **English**.

#### For native English speakers

Try to use simple words and sentences. Don't make fun of non-native English speakers if you find something wrong about the way they express themselves.

Try to encourage newcomers to express their opinions, and make them comfortable enough to do so.

## How can I help?

Here are some ways you can help along with some guidelines.

### Issues

Some issues are created with missing information, without a template, not reproducible, or plain invalid.

You can make them easier to understand and resolve.

#### Submitting an issue

- Please search for similar issues before opening a new one;
- Use one of the corresponding issue templates;
- Use a clear and descriptive title;
- Include as much information as possible by filling out the provided issue
  template;

### Feedback

The more feedback the better! Any suggestion or opinion are welcome as an opportunity to influence the future improvements of this web application.

This includes submitting an enhancement suggestion, including completely new features and minor improvements to existing functionality.

The [`question`](https://github.com/tvc95/pokedex-react/labels/question) and [`rfc`](https://github.com/tvc95/pokedex-react/labels/rfc) labels are a good place to find ongoing discussions.

### Code

You can use issue labels to discover issues you could help out with:

- [`bug` issues](https://github.com/tvc95/pokedex-react/labels/bug) are known bugs we'd like to fix;
- [`enhancement` issues](https://github.com/tvc95/pokedex-react/labels/enhancement) are features we're open to include.

The [`help wanted`](https://github.com/tvc95/pokedex-react/labels/help%20wanted)
and [`good first issue`](https://github.com/tvc95/pokedex-react/labels/good%20first%20issue) labels are especially useful.

When you see an issue that is already assigned, please check to see if there isn't someone working on it already (maybe try asking in the issue). This is to prevent unnecessary work for everyone involved.

#### Dev environment

When developing, prefer using **Node** ≥ 12.0 and **yarn**. Writing code with the latest stable Node versions allows us to use newer developer tools.

After [cloning the repository](https://help.github.com/articles/cloning-a-repository/), run `yarn` to install dependencies.

This project uses [Prettier](http://prettier.io/) for code formatting. Consider installing an [editor plugin](https://prettier.io/docs/en/editors.html) for the best experience.

## Commiting

A commit message can consists of a **header**, **body** and **footer**. The header is the only mandatory part and consists of a type and a subject. The body is used to fully describe the change. The footer is the place to reference any issues or pull requests related to the commit. That said, we end with a template like this:

```
<type>: <subject>

[optional body]

[optional footer]
```

With regards to the commit type, it must be lowercase and one of:
  - **chore**: A change that neither fix a bug nor adds a feature;
  - **ci**: A CI change;
  - **docs**: A documentation change or fix;
  - **feature**: A new feature;
  - **fix**: A bug fix;
  - **test**: A test-related change.

You also should follow these general guidelines when committing:

- Use the present tense ("Add feature" not "Added feature");
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...");
- Try to answer the following questions:
  - Why is this change necessary?
  - How does it address the issue?
  - What side effects (if any) does this change may have?

Example of a commit message:

```
type: Commit message style guide for Git

The first line of a commit message serves as a summary.  When displayed
on the web, it's often styled as a heading, and in emails, it's
typically used as the subject. As such, you should specify a "type" and
a "subject". The type must be lowercase and one of: chore, ci, docs,
feat, fix, test. For the subject you'll need capitalize it and
omit any trailing punctuation. Aim for about 50 characters, give or
take, otherwise it may be painfully truncated in some contexts. Write
it, along with the rest of your message, in the present tense and
imperative mood: "Fix bug" and not "Fixed bug" or "Fixes bug".
Consistent wording makes it easier to mentally process a list of
commits.

Oftentimes a subject by itself is sufficient. When it's not, add a
blank line (this is important) followed by one or more paragraphs hard
wrapped to 72 characters. Git is strongly opinionated that the author
is responsible for line breaks; if you omit them, command line tooling
will show it as one extremely long unwrapped line. Fortunately, most
text editors are capable of automating this.

Issues and pull request can be referenced on the footer: #3 #12
```

### Why all these rules?

These rules are important for the following reasons:

- Automatically generating changelog;
- Communicating in a better way the nature of changes;
- Triggering build and publish processes;
- Automatically determining a semantic version bump (based on the types of commits);
- Making it easier for people to contribute, by allowing them to explore a more structured commit history.

## Submitting a pull request

Before submitting a pull request, please make sure the following is done:

- [Fork](https://help.github.com/en/articles/fork-a-repo) the repository and create your branch from `main`.
  - Example: `feature/my-awesome-feature` or `fix/annoying-bug`;
- Run `yarn` in the repository root;
- If you’ve fixed a bug or added code that should be tested, **add tests**;
- Ensure the test suite passes;
- Ensure your commit is validated;
