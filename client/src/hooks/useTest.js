import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as testService from '../services/testService';
import { errMsg } from '../services/api';
import useCountdown from './useCountdown';

const storeKey = (id) => 'answers_' + id;

export default function useTest() {
  const nav = useNavigate();
  const [attempt, setAttempt] = useState(null); 
  const [answers, setAnswers] = useState({});   
  const [idx, setIdx] = useState(0);
  const [endAt, setEndAt] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const started = useRef(false); 
  const sent = useRef(false);    
  const answersRef = useRef({});
  answersRef.current = answers;

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    testService
      .start()
      .then((data) => {
        let saved = {};
        try {
          saved = JSON.parse(localStorage.getItem(storeKey(data.attemptId))) || {};
        } catch {
          
        }
        setAnswers(saved);
        setAttempt(data);
        setEndAt(Date.now() + data.remainingSeconds * 1000);
      })
      .catch((err) => setError(errMsg(err)));
  }, []);

  useEffect(() => {
    if (attempt) localStorage.setItem(storeKey(attempt.attemptId), JSON.stringify(answers));
  }, [answers, attempt]);

  const submit = useCallback(
    async (auto = false) => {
      if (sent.current || !attempt) return;
      sent.current = true;
      setSubmitting(true);
      try {
        const data = await testService.submit(attempt.attemptId, answersRef.current, auto);
        localStorage.removeItem(storeKey(attempt.attemptId));
        nav(`/result/${data.attemptId}`, { replace: true });
      } catch (err) {
        sent.current = false; 
        setSubmitting(false);
        setError(errMsg(err));
      }
    },
    [attempt, nav]
  );

  const left = useCountdown(endAt, () => submit(true));

  const choose = (questionId, optionIndex) =>
    setAnswers((a) => ({ ...a, [questionId]: optionIndex }));

  const questions = attempt ? attempt.questions : [];

  return {
    loading: !attempt && !error,
    error,
    questions,
    current: questions[idx],
    idx,
    setIdx,
    answers,
    answeredCount: Object.keys(answers).length,
    choose,
    left,
    submit,
    submitting,
  };
}