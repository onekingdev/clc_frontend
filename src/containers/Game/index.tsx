import React, { useState, useEffect, useRef } from "react";
// @ts-ignore
import { connect } from "react-redux";
import * as PERFORMANCE_ACTIONS from "../Performance/store/actions";
import * as ACTIONS from "./store/actions";
import * as RESULT_ACTIONS from "../Results/store/actions";
import "./styles.css";
import Table from "../../assets/images/table.png";
import Player from "../../components/Player";
import HouseOfCards from "../../components/HouseOfCards";
import PokerPlayer from "../../components/PokerPlayer";
import QuestionCard from "../../components/QuestionCard";
import SmallText from "../../components/SmallText";
import ScreenTemplate from "../ScreenTemplate";
import { numberWithCommas, UTGLabeling } from "../../helpers/formatter";
// @ts-ignore
import { useHistory } from "react-router-dom";
// @ts-ignore
import Modal from "react-awesome-modal";
import BodyText from "../../components/BodyText";
import Button from "../../components/Button";
import QuestionProgress from "../../components/QuestionsProgress";

let interval: any;

function Game(props: any) {
  const history = useHistory();
  const pathname = new URL(window.location.href).pathname;
  let [correctCounter, setCorrectCounter] = useState(0);
  let [handIndex, setHandIndex] = useState(0);
  let [questionIndex, setQuestionIndex] = useState(0);
  let [pot, setPot] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [speed, setSpeed] = useState(1200);
  const [pause, setPause] = useState(true);
  const [finished, setFinished] = useState(false);
  const [tableAction, setTableAction] = useState("");
  const [questions, setQuestions]: any = useState({ array: [], render: false });
  const [showModal, setShowModal] = useState(false);
  const [useStartIndex, setUseStartIndex] = useState(true);
  const [animationBlocker, setAnimationBlocker] = useState(0);
  const [initBlockPlayBtn, setInitBlockPlayBtn] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [chips, setChips] = useState(0);
  const [tickets, setTickets] = useState(0);
  const [rerender, setRerender] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [progressData, setProgressData] = useState([]);
  const [progressIndex, setProgressIndex] = useState(0);
  const [changeMoney, setChangeMoney] = useState(false);
  const [changeAmount, setChangeAmount] = useState(false);

  useEffect(() => {
    return () => {
      stop();
      props.clearGameData();
      props.clearResultsData();
    };
  }, []);

  useEffect(() => {
    if (props.myTopics.length > 0) {
      props.fetchGameData(props.myTopics);
    }
  }, [props.myTopics === undefined || props.myTopics.length === 0]);

  useEffect(() => {
    if (props.dailyChallenge.questions) {
      const UID = JSON.parse(
        sessionStorage.getItem("selectedTopic") as string
      ).lessonUID;
      props.fetchQuestionProgressbar(
        pathname.substr(1, pathname.length),
        props.dailyChallenge.questions,
        UID
      );
      if (pathname !== "/assessment") {
        setShowFeedback(true);
      }
    }
  }, [props.dailyChallenge && props.dailyChallenge.questions]);

  useEffect(() => {
    if (initBlockPlayBtn) {
      setTimeout(() => setInitBlockPlayBtn(false), 2000);
    }
  }, [initBlockPlayBtn]);

  useEffect(() => {
    if (props.questions && props.questions.length > 0) {
      setQuestions({ array: props.questions, render: !questions.render });
    }

    if (props.progressData.length > 0) {
      setProgressData(props.progressData);
      setProgressIndex(props.progressIndex);
    }
  }, [props.questions, props.progressData]);

  useEffect(() => {
    if (questions.array.length > 0) {
      calculateAllAnte();
    }
  }, [questions]);

  // adjust dimensions
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [width]);

  useEffect(() => {
    if (questions.array.length > 0) {
      if (pause) {
        stop();
      } else {
        setUseStartIndex(false);
        start();
      }
    }
  }, [pause, props.isFetchingGameData]);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  const getPastPlayerIndex = (array: any[], value: any, jump: number) => {
    let n = 0;
    let index = 0;
    array.forEach((item, i) => {
      if (item.player === value && i < jump) {
        n++;
      }
    });
    for (let i = 0, len = array.length; i < len; i++) {
      if (i in array && value === array[i].player && !--n) {
        index = i;
        break;
      }
    }
    return index;
  };

  const back = () => {
    setPause(true);
    setFinished(false);
    clearInterval(interval);
    if (animationBlocker < handIndex && handIndex > 0) {
      let index = handIndex;
      index -= 1;
      pot -= questions.array[questionIndex].hands[index].amount;
      setPot(pot);
      setChangeAmount(true);
      setHandIndex(index);
      setTableAction(questions.array[questionIndex].hands[index].tableAction);
    }
    for (let i = 0; i <= handIndex; i++) {
      questions.array[questionIndex].hands[i].action =
        questions.array[questionIndex].hands[i].copyAction;
      questions.array[questionIndex].hands[i].amount =
        questions.array[questionIndex].hands[i].copyAmount;
    }
  };

  const forward = () => {
    if (questions.array[questionIndex].hands[handIndex].tableAction !== "") {
      for (let i = handIndex; i >= 0; i--) {
        if (questions.array[questionIndex].hands[i].action === "folds") {
          questions.array[questionIndex].hands[i].action = "fold";
        } else if (questions.array[questionIndex].hands[i].action === "fold") {
          questions.array[questionIndex].hands[i].action = "fold";
        } else {
          questions.array[questionIndex].hands[i].action = "";
        }
        questions.array[questionIndex].hands[i].amount = "";
      }
    }

    if (useStartIndex) {
      setUseStartIndex(false);
      clearInterval(interval);
      setPause(true);
    }

    if (questions.array[questionIndex].hands.length - 1 === handIndex) {
      stop();
      setFinished(true);

      return;
    }
    if (handIndex < questions.array[questionIndex].hands.length - 1) {
      let index = handIndex + 1;
      setChangeAmount(false);
      if (questions.array[questionIndex].hands[handIndex].tableAction !== "") {
        setPot(pot);
      } else {
        pot += questions.array[questionIndex].hands[handIndex].amount;
        setPot(pot);
      }
      setTableAction(
        questions.array[questionIndex].hands[handIndex].tableAction
      );
      setPause(true);
      setHandIndex(index);
    }
  };

  const move = () => {
    if (questions.array[questionIndex].hands.length - 1 === handIndex) {
      stop();
      setFinished(true);
      return;
    }
    if (pause) return;

    if (handIndex < questions.array[questionIndex].hands.length - 1) {
      if (questions.array[questionIndex].hands[handIndex].tableAction !== "") {
        setPot(pot);
      } else {
        pot += questions.array[questionIndex].hands[handIndex].amount;
        setPot(pot);
      }
      setTableAction(
        questions.array[questionIndex].hands[handIndex].tableAction
      );
      setChangeAmount(false);
      setHandIndex((handIndex += 1));
    } else stop();
    if (questions.array[questionIndex].hands[handIndex].tableAction !== "") {
      for (let i = handIndex; i >= 0; i--) {
        if (questions.array[questionIndex].hands[i].action === "folds") {
          questions.array[questionIndex].hands[i].action = "fold";
        } else if (questions.array[questionIndex].hands[i].action === "fold") {
          questions.array[questionIndex].hands[i].action = "fold";
        } else {
          questions.array[questionIndex].hands[i].action = "";
        }
        questions.array[questionIndex].hands[i].amount = "";
      }
    }
  };

  const start = () => {
    setPause(false);
    interval = setInterval(move, speed);
    setChangeAmount(false);
  };

  const stop = () => {
    setPause(true);
    clearInterval(interval);
    setTableAction("");
  };

  const reset = () => {
    setPause(true);
    setHandIndex(0);
    setPot(0);
    setFinished(false);
    clearInterval(interval);
    setUseStartIndex(true);
    setInitBlockPlayBtn(true);
    setTimeout(() => calculateAllAnte(), 1000);
  };

  const resetGame = () => {
    setChangeAmount(true);
    for (let i = 0; i <= handIndex; i++) {
      questions.array[questionIndex].hands[i].action =
        questions.array[questionIndex].hands[i].copyAction;
      questions.array[questionIndex].hands[i].amount =
        questions.array[questionIndex].hands[i].copyAmount;
    }
    reset();
  };

  const speedHandler = (s: number) => {
    stop();
    setSpeed(s);
  };

  const handleChipPos = (player: number) => {
    if (player === 1 || player === 2 || player === 3) {
      return "bottom";
    } else if (player === 4 || player === 5) {
      return "left";
    } else if (player === 6 || player === 7 || player === 8) {
      return "top";
    } else {
      return "right";
    }
  };

  const handleAnswerQuestion = (correct: boolean) => {
    setTimeout(() => {
      if (correct) {
        let localChips = questions.array[questionIndex].question.reward.chips;
        let localTickets =
          questions.array[questionIndex].question.reward.tickets;
        setChips(
          (localChips += questions.array[questionIndex].question.reward.chips)
        );
        setTickets(
          (localTickets +=
            questions.array[questionIndex].question.reward.tickets)
        );

        props.updateDailyEarnings({ chips: localChips, tickets: localTickets });
        props.saveEarnings(pathname, {
          userID: props.user.id,
          questionID: questions.array[questionIndex].question.questionID,
          challenge: 0,
          chips: localChips,
          tickets: localTickets,
          correct: 1,
        });
        setCorrectCounter((correctCounter += 1));
        // saving for results
        let ticketsEarned = props.ticketsEarned;
        let chipsEarned = props.chipsEarned;
        props.setTicketsEarned((ticketsEarned += tickets));
        props.setChipsEarned((chipsEarned += chips));
      } else {
        props.saveEarnings(pathname, {
          userID: props.user.id,
          questionID: questions.array[questionIndex].question.questionID,
          challenge: 0,
          chips: 0,
          tickets: 0,
          correct: 0,
        });
      }
      props.updateMyTopics(
        pathname,
        questions.array[questionIndex].question.questionID,
        correct,
        questions.array[questionIndex].topicData
      );
    }, 500);

    if (
      pathname === "/game" ||
      props.dailyChallenge.counter !== props.dailyChallenge.questions
    ) {
      let p: any = progressData;
      p[pathname === "/game" ? questionIndex : progressIndex] = {
        id: questions.array[questionIndex].question.questionID,
        correct: correct,
      };
      setProgressData(p);
    }
  };

  const handleSubmit = () => {
    let blocker = false;
    setRerender(true);
    reset();
    if (
      (questionIndex === questions.array.length - 1 ||
        props.fetchNextAIQuestions) &&
      pathname === "/ai"
    ) {
      window.location.reload();
    } else if (
      questionIndex === questions.array.length - 1 &&
      pathname === "/assessment"
    ) {
      blocker = true;
      props.saveAssessment(
        {
          ticketsEarned: props.ticketsEarned + tickets,
          chipsEarned: props.chipsEarned + chips,
          correct: correctCounter + props.correctQuestions,
          totalQuestions: props.totalQuestions,
        },
        () => {
          props.clearResultsData();
          history.push("results");
        }
      );
    }

    if (!blocker) {
      setTimeout(() => {
        if (
          (questionIndex < questions.array.length &&
            pathname === "/assessment") ||
          questionIndex < questions.array.length - 1
        ) {
          setQuestionIndex((questionIndex += 1));

          if (
            pathname === "/game" ||
            props.dailyChallenge.counter < props.dailyChallenge.questions
          ) {
            let i = progressIndex;
            setProgressIndex((i += 1));
          } else if (
            pathname === "/ai" &&
            props.dailyChallenge.counter === props.dailyChallenge.questions
          ) {
            setProgressIndex(props.dailyChallenge.questions);
          }
        } else {
          // history.push('results')
          setShowModal(true);
        }
        setFinished(false);
        setRerender(false);
      }, 500);
    }
    const resetScroll = document.getElementById("contentContainer");
    resetScroll?.scrollTo(0, 0);
  };

  const handleSkipLesson = () => {
    const topic = JSON.parse(sessionStorage.getItem("selectedTopic") as string);
    const lessonIndex = topic.allTopicLessons.findIndex(
      (l: any) => l.UID === topic.lessonUID
    );
    topic.lessonUID = topic.allTopicLessons[lessonIndex + 1].UID;
    topic.lessonName = topic.allTopicLessons[lessonIndex + 1].name;
    sessionStorage.setItem("selectedTopic", JSON.stringify(topic));
    window.location.reload();
  };

  const renderSkipLessonBtn = () => {
    const topic = JSON.parse(sessionStorage.getItem("selectedTopic") as string);
    if (!topic || !topic.allTopicLessons) return null;
    if (topic.allTopicLessons.length > 0) {
      const lessonIndex = topic.allTopicLessons.findIndex(
        (l: any) => l.UID === topic.lessonUID
      );
      if (topic.allTopicLessons.length - 1 === lessonIndex) return null;
    }
    return (
      <Button
        onClick={() => handleSkipLesson()}
        width={300}
        height={42}
        glow
        text="Next Lesson"
      />
    );
  };

  const calculateAllAnte = () => {
    let amount = 0;
    questions.array[questionIndex].hands.forEach((hand: any, index: number) => {
      if (
        hand.action === "ante" ||
        hand.action === "posts the ante" ||
        hand.action === "posts ante"
      ) {
        setPot((amount += hand.amount));
        setHandIndex(index + 1);
        setAnimationBlocker(index + 1);
      }
    });
  };

  const callsChange = (amount: number, hands: any) => {
    let handPrev = hands[0].amount;
    for (let i = 0; i <= handIndex; i++) {
      if (hands[i].amount > handPrev) {
        handPrev = hands[i].amount;
        amount = handPrev;
      }
    }

    return amount;
  };

  const share = () => {
    if (questions.array[questionIndex].topicData) {
      console.log(questions.array[questionIndex].topicData.UID);
      console.log(questions.array[questionIndex].topicData.lessonUID);
      console.log(questions.array[questionIndex].question.questionID);
    } else {
      const topic = JSON.parse(
        sessionStorage.getItem("selectedTopic") as string
      );
      console.log(topic.UID);
      console.log(topic.lessonUID);
      console.log(questions.array[questionIndex].question.questionID);
    }
  };

  const renderQuestionProgressbarIndex = (path: string) => {
    if (path === "/game") return questionIndex;
    else return progressIndex;
  };
  const handleChangeMoney = () => {
    changeMoney ? setChangeMoney(false) : setChangeMoney(true);
  };

  const changeLingo = (str: string, item: any, index: number) => {
    let amt =
      parseInt(item.number) ===
      questions.array[questionIndex].hands[useStartIndex ? index : handIndex]
        .player
        ? questions.array[questionIndex].hands[
            useStartIndex ? index : handIndex
          ].amount
        : questions.array[questionIndex].hands[
            getPastPlayerIndex(
              questions.array[questionIndex].hands,
              parseInt(item.number),
              useStartIndex ? index : handIndex
            )
          ].amount;

    let hasNoMoney = item.initAmount === 0;
    if (str === "raises") return "raise to";
    else if (str === "is allIn" || hasNoMoney) return "all-in";
    else return str;
  };

  const [wallets, setWallets] = useState<Object>({});

  const getCurrentBalance = (move: any, player: number) => {
    const arrayExists = questions.hasOwnProperty("array");
    const handExists = () => {
      if (arrayExists) {
        if (questions.array[questionIndex]) {
          return questions.array[questionIndex].hasOwnProperty("hands");
        }
      }
    };
    let betted = 0;
    if (arrayExists && handExists()) {
      const game = questions.array[questionIndex].hands;
      for (let i = 0; i <= game; i++) {
        if (game[i].player == player) {
          betted += game[i].amount;
        }
      }
    }
  };

  useEffect(() => {
    getCurrentBalance(10, 1);
  }, [questionIndex]);

  const updateWallets = (amount: number, player: string, wallets: any) => {
    if (wallets.hasOwnProperty(player))
      setWallets({ ...wallets, player: wallets[player] + amount });
    else setWallets({ ...wallets, player: amount });
    return amount;
  };

  return (
    <ScreenTemplate
      id="screenTemplate"
      type={pathname.substr(1, pathname.length)}
      loading={!props.isFetchingGameData || props.questions.length === 0}
    >
      {questions.array.length === 0 ? null : (
        <div className="gameWrapper">
          {showTable ? (
            <div>
              <div className="gamePokerTableContainer">
                {!showModal &&
                !rerender &&
                questions.array[questionIndex].players.length > 0
                  ? questions.array[questionIndex].players.map(
                      (item: any, index: number) => (
                        <div
                          className={`gamePokerPlayerWrapper gameP${parseInt(
                            item.number
                          )}`}
                        >
                          <PokerPlayer
                            index={index}
                            UTGLabels={UTGLabeling(
                              questions.array[questionIndex].tableInfo.dealer,
                              questions.array[questionIndex].players
                            )}
                            players={
                              questions.array[questionIndex].tableInfo.players
                            }
                            player={parseInt(item.number)}
                            me={
                              parseInt(item.number) ===
                              questions.array[questionIndex].hands[
                                useStartIndex ? index : handIndex
                              ].player
                                ? questions.array[questionIndex].hands[
                                    useStartIndex ? index : handIndex
                                  ].cards.length > 0
                                : false
                            }
                            cards={
                              parseInt(item.number) ===
                              questions.array[questionIndex].hands[
                                useStartIndex ? index : handIndex
                              ].player
                                ? questions.array[questionIndex].hands[
                                    useStartIndex ? index : handIndex
                                  ].cards
                                : questions.array[questionIndex].hands[
                                    getPastPlayerIndex(
                                      questions.array[questionIndex].hands,
                                      parseInt(item.number),
                                      useStartIndex ? index : handIndex
                                    )
                                  ].cards
                            }
                            mp={item.initAmount}
                            chipPos={
                              parseInt(item.number) ===
                              questions.array[questionIndex].hands[
                                useStartIndex ? index : handIndex
                              ].player
                                ? handleChipPos(
                                    questions.array[questionIndex].hands[
                                      useStartIndex ? index : handIndex
                                    ].player
                                  )
                                : handleChipPos(
                                    questions.array[questionIndex].hands[
                                      getPastPlayerIndex(
                                        questions.array[questionIndex].hands,
                                        parseInt(item.number),
                                        useStartIndex ? index : handIndex
                                      )
                                    ].player
                                  )
                            }
                            turn={
                              parseInt(item.number) ===
                              questions.array[questionIndex].hands[
                                useStartIndex ? index : handIndex
                              ].player
                            }
                            dealer={
                              questions.array[questionIndex].tableInfo.dealer
                            }
                            action={
                              parseInt(item.number) ===
                              questions.array[questionIndex].hands[
                                useStartIndex ? index : handIndex
                              ].player
                                ? changeLingo(
                                    questions.array[questionIndex].hands[
                                      useStartIndex ? index : handIndex
                                    ].action,
                                    item,
                                    index
                                  )
                                : changeLingo(
                                    questions.array[questionIndex].hands[
                                      getPastPlayerIndex(
                                        questions.array[questionIndex].hands,
                                        parseInt(item.number),
                                        useStartIndex ? index : handIndex
                                      )
                                    ].action,
                                    item,
                                    index
                                  )
                            }
                            // amount
                            amount={
                              parseInt(item.number) ===
                              questions.array[questionIndex].hands[
                                useStartIndex ? index : handIndex
                              ].player
                                ? questions.array[questionIndex].hands[
                                    useStartIndex ? index : handIndex
                                  ].amount
                                : questions.array[questionIndex].hands[
                                    getPastPlayerIndex(
                                      questions.array[questionIndex].hands,
                                      parseInt(item.number),
                                      useStartIndex ? index : handIndex
                                    )
                                  ].amount
                            }
                            pot={pot}
                            bb={parseInt(
                              questions.array[questionIndex].tableInfo.bb
                            )}
                            changeMoney={changeMoney}
                            callMoney={callsChange(
                              parseInt(item.number) ===
                                questions.array[questionIndex].hands[
                                  useStartIndex ? index : handIndex
                                ].player
                                ? questions.array[questionIndex].hands[
                                    useStartIndex ? index : handIndex
                                  ].amount
                                : questions.array[questionIndex].hands[
                                    getPastPlayerIndex(
                                      questions.array[questionIndex].hands,
                                      parseInt(item.number),
                                      useStartIndex ? index : handIndex
                                    )
                                  ].amount,
                              questions.array[questionIndex].hands
                            )}
                            changeAmount={changeAmount}
                          />
                        </div>
                      )
                    )
                  : null}
                {showTable ? (
                  <div className="gameHouseOfCardsWrapper">
                    <HouseOfCards
                      cards={questions.array[questionIndex].flop}
                      tableAction={tableAction}
                      handIndex={handIndex}
                      players={questions.array[questionIndex].players.length}
                    />
                  </div>
                ) : null}
                <img src={Table} width={700} />
                {!showModal && !rerender ? (
                  <div className="gamePotWrapper">
                    <SmallText color="#FFF">
                      POT{" "}
                      <SmallText color="#FFF" bold>
                        {numberWithCommas(
                          changeMoney
                            ? Number(
                                (
                                  pot /
                                  parseInt(
                                    questions.array[questionIndex].tableInfo.bb
                                  )
                                ).toFixed(2)
                              )
                            : pot
                        )}
                      </SmallText>
                      <SmallText>{changeMoney ? " BB" : ""}</SmallText>
                      {!changeMoney
                        ? `(${numberWithCommas(
                            questions.array[questionIndex].tableInfo.bb
                          )} BB)`
                        : null}
                    </SmallText>
                  </div>
                ) : null}
              </div>
              <div className="gameFooterContainer">
                <div className="gamePlayerWrapper">
                  {!showModal && !rerender ? (
                    <Player
                      init={initBlockPlayBtn}
                      pause={pause}
                      setPause={setPause}
                      replay={resetGame}
                      speed={speed}
                      setSpeed={(s) => speedHandler(s)}
                      volume={5}
                      favorite={false}
                      rewind={back}
                      fastForward={forward}
                      finished={finished}
                      share={share}
                      cash={handleChangeMoney}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}
          <div className="gameQuestionWrapper">
            <QuestionCard
              showQuestionNumber={pathname !== "/ai"}
              rerender={rerender}
              loading={!finished}
              headerText={questions.array[questionIndex].question.header}
              questionNumber={
                questions.array[questionIndex].question.questionNumber
              }
              description={questions.array[questionIndex].question.description}
              options={questions.array[questionIndex].question.answers}
              myTopics={props.myTopics}
              topicData={questions.array[questionIndex].topicData}
              callback={handleAnswerQuestion}
              buttonText={
                questionIndex < questions.array.length - 1 || pathname === "/ai"
                  ? "Next Question"
                  : "Finish!"
              }
              next={handleSubmit}
            />
          </div>
        </div>
      )}
      {questions.array.length > 0 ? (
        <div className="gameQuestionProgressbarWrapper">
          <QuestionProgress
            loading={props.totalQuestions === 0}
            totalQuestions={props.totalQuestions}
            index={renderQuestionProgressbarIndex(pathname)}
            result={progressData}
            showFeedback={showFeedback}
            tooltip=""
          />
        </div>
      ) : null}
      <Modal visible={showModal} width="420px" height="320px" effect="fadeInUp">
        <div className="gameModalContentWrapper">
          <div>
            <BodyText>{`You finished all questions in this lesson. ${correctCounter}/${questions.array.length} correct`}</BodyText>
            <div
              className="gameModalContentWrapper"
              style={{ marginTop: 20, marginBottom: 20 }}
            >
              <Button
                onClick={() => history.push("paths")}
                width={300}
                height={42}
                glow
                text="Go to Paths"
              />
            </div>
            <div className="gameModalContentWrapper">
              {renderSkipLessonBtn()}
            </div>
          </div>
        </div>
      </Modal>
    </ScreenTemplate>
  );
}

const mapStateToProps = (state: any) => {
  return {
    user: state.authState.user,
    questions: state.gameState.questions,
    fetchNextAIQuestions: state.gameState.fetchNextAIQuestions,
    isFetchingGameData: state.gameState.isFetchingGameData,
    myTopics: state.screenTemplateState.myTopics,
    dailyChallenge: state.screenTemplateState.dailyChallenge,
    ticketsEarned: state.resultState.ticketsEarned,
    chipsEarned: state.resultState.chipsEarned,
    correctQuestions: state.resultState.correctQuestions,
    totalQuestions: state.resultState.totalQuestions,
    progressData: state.resultState.progressData,
    progressIndex: state.resultState.progressIndex,
  };
};

const bindActions = (dispatch: any) => {
  return {
    fetchGameData: (myTopics: any) => dispatch(ACTIONS.fetchGameData(myTopics)),
    setFetchNextAIQuestions: (fetch: boolean) =>
      dispatch(ACTIONS.setFetchNextAIQuestions(fetch)),
    saveEarnings: (
      path: string,
      data: {
        tickets: number;
        questionID: number;
        chips: number;
        userID: number;
        challenge: number;
        correct: number;
      }
    ) => dispatch(ACTIONS.saveEarnings(path, data)),
    updateMyTopics: (
      path: string,
      questionID: number,
      correct: boolean,
      topicData: any
    ) => dispatch(ACTIONS.updateMyTopics(path, questionID, correct, topicData)),
    updateDailyEarnings: (data: { chips: number; tickets: number }) =>
      dispatch(PERFORMANCE_ACTIONS.updateDailyEarnings(data)),
    clearGameData: () => dispatch(ACTIONS.clearGameData()),
    setTicketsEarned: (tickets: number) =>
      dispatch(RESULT_ACTIONS.setTicketsEarned(tickets)),
    setChipsEarned: (chips: number) =>
      dispatch(RESULT_ACTIONS.setChipsEarned(chips)),
    setCorrectQuestions: (correct: number) =>
      dispatch(RESULT_ACTIONS.setCorrectQuestions(correct)),
    setTotalQuestions: (questions: number) =>
      dispatch(RESULT_ACTIONS.setTotalQuestions(questions)),
    saveAssessment: (
      assessment: {
        correct: number;
        totalQuestions: number;
        ticketsEarned: number;
        chipsEarned: number;
      },
      callback: () => void
    ) => dispatch(RESULT_ACTIONS.saveAssessment(assessment, callback)),
    fetchQuestionProgressbar: (
      type: string,
      dailyQuestions?: number,
      UID?: string
    ) =>
      dispatch(
        RESULT_ACTIONS.fetchQuestionProgressbar(type, dailyQuestions, UID)
      ),
    clearResultsData: () => dispatch(RESULT_ACTIONS.clearResultsData()),
  };
};

export default connect(mapStateToProps, bindActions)(Game);
