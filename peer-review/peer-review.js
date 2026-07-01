const form = document.getElementById('review-form');
const nameInput = document.getElementById('name');
const resultInput = document.getElementById('result');

const verdictSection = document.getElementById('verdict-section');
const kicker = document.getElementById('kicker');
const verdictTitle = document.getElementById('verdict-title');
const verdictSubtitle = document.getElementById('verdict-subtitle');
const verdictStamp = document.getElementById('verdict-stamp');

const decisionTitle = document.getElementById('decision-title');
const decisionText = document.getElementById('decision-text');
const evidenceScore = document.getElementById('evidence-score');
const logicScore = document.getElementById('logic-score');
const reviewerComments = document.getElementById('reviewer-comments');
const gusQuote = document.getElementById('gus-quote');
const shareUrl = document.getElementById('share-url');
const copyButton = document.getElementById('copy-link');

function cleanName(value) {
  return value.trim().replace(/[<>]/g, '') || 'Someone';
}

function titleCaseResult(result) {
  return result === 'wrong' ? 'Wrong' : 'Right';
}

function renderReview(name, result) {
  const isWrong = result === 'wrong';
  const resultText = titleCaseResult(result);

  nameInput.value = name;
  resultInput.value = result;

  verdictTitle.textContent = `${name} Is ${resultText}`;

  verdictSection.classList.toggle('hero-right', !isWrong);

  verdictStamp.className = isWrong ? 'wrong-stamp' : 'correct-stamp';
  verdictStamp.textContent = isWrong ? '✗ PEER REVIEW FAILED' : '✓ VERIFIED CORRECT';

  kicker.textContent = isWrong
    ? 'Official Editorial Finding'
    : 'Official Scientific Consensus';

  verdictSubtitle.textContent = isWrong
    ? `After reviewing the available evidence, the committee has determined that ${name}'s position collapses under the weight of being incorrect.`
    : `After extensive peer review, independent replication, and several moments of quiet reflection, the committee has unanimously concluded that ${name} is correct.`;

  decisionTitle.textContent = isWrong
    ? 'Rejected for Insufficient Correctness'
    : 'Accepted as Established Fact';

  decisionText.textContent = isWrong
    ? `The argument failed to meet the journal’s minimum standards for accuracy, clarity, and agreeing with the reviewer.`
    : `The findings exceed all scientific, logical, statistical, and argumentative standards required for publication.`;

  evidenceScore.textContent = isWrong ? 'Thin' : 'Overwhelmingly Convenient';
  logicScore.textContent = isWrong ? 'Wobbly' : 'Flawless';

  reviewerComments.textContent = isWrong
    ? `${name}'s conclusion was examined carefully and then placed gently in the recycling bin.`
    : `${name}'s manuscript was examined thoroughly and found to be remarkably consistent with the preferred conclusion.`;

  gusQuote.textContent = isWrong
    ? '“I reviewed the evidence thoroughly and then sat on it.”'
    : '“The findings are compelling and also I would like lunch.”';

  const url = new URL(window.location.href);
  url.searchParams.set('name', name);
  url.searchParams.set('result', result);

  shareUrl.value = url.toString();

  document.title = `${name} Is ${resultText} | Definitely A Real Scientific Journal`;
}

function loadFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const name = cleanName(params.get('name') || '');
  const result = params.get('result') === 'wrong' ? 'wrong' : 'right';

  if (params.has('name')) {
    renderReview(name, result);
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = cleanName(nameInput.value);
  const result = resultInput.value === 'wrong' ? 'wrong' : 'right';

  const url = new URL(window.location.href);
  url.searchParams.set('name', name);
  url.searchParams.set('result', result);

  window.history.pushState({}, '', url);
  renderReview(name, result);
});

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(shareUrl.value);
    copyButton.textContent = 'Copied!';
    setTimeout(() => {
      copyButton.textContent = 'Copy Link';
    }, 1500);
  } catch {
    shareUrl.select();
    document.execCommand('copy');
  }
});

loadFromUrl();