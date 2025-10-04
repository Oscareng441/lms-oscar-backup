<?php

namespace App\Helpers;

use App\Models\AnswerSet;
use App\Models\ProblemHint;

class UploadHelper
{
    protected $content = '';
    protected $contentArr = [];
    protected $message = '';
    protected $currentLineNumber = 0;
    protected $problemText = '';
    protected $answerTypes = ['s', 'm', 'o', 'n'];
    protected $answerType = 's';
    protected $answers = [];
    protected $correctAnswers = [];
    protected $hints = [];
    // protected $correctAnswerCount = 0;

    public function __construct(string $content)
    {
        $this->content = $content;
        $this->contentArr = preg_split("/\r\n|\n|\r/", $content);
    }

    public function getMessage()
    {
        return $this->message;
    }

    public function getProblemText()
    {
        return $this->problemText;
    }

    public function getAnswers()
    {
        return $this->answers;
    }

    public function getcorrectAnswers()
    {
        return $this->correctAnswers;
    }

    public function getcorrectAnswerCount()
    {
        return count($this->correctAnswers);
    }

    public function getAnswerType()
    {
        return 1 + array_search($this->answerType, $this->answerTypes);
    }

    public function check() 
    {
        if (! $this->checkProblemText()) {
            $this->message = 'problem text';
            return false;
        }
        if (! $this->checkAnswerType()) {
            $this->message = 'answer type must be one of "s,m,o,n"';
            return false;
        }
        if (! $this->checkAnswers()) {
            // $this->message = 'answers....';
            return false;
        }

        return true;
    }

    public function build($p)
    {
        // $this->checkProblemText();
        // $this->checkAnswerType();
        // $this->checkAnswers();
        $this->check();
        $p->problem_text = $this->getProblemText();
        $p->problem_type_id = $this->getAnswerType();
        $p->save();
        $a = $this->getAnswers();
        $ca = $this->getCorrectAnswers();
        foreach ($a as $k => $distractor) {
            $ans = new AnswerSet();
            $ans->answer_text = $distractor;
            $ans->problem_id = $p->id;
            $ans->is_correct = in_array($distractor, $this->correctAnswers) ?  1 : 0; 
            $ans->display_type = 'latex';
            $ans->active = 1;
            $ans->save();
        }
        $this->checkHints();
        $seqId = 10;
        foreach ($this->hints as $hint) {
            $h = new ProblemHint();
            $h->hint = $hint;
            $h->problem_id = $p->id;
            $h->sequence_id = $seqId; 
            $seqId += 10;
            $h->save();
        }

        return $p;
    }

    protected function checkProblemText() 
    {
        while ($ln = $this->contentArr[$this->currentLineNumber++]) {
            if (!empty($ln)) {
                $this->problemText = $ln;
                return true;
            }
        }
        return false;
    }

    protected function checkAnswerType() 
    {
        while ($ln = $this->contentArr[$this->currentLineNumber++]) {
            OmniHelper::log('ln ' . $ln);
            if (!empty($ln)) {
                $this->answerType = substr($ln, 0, 1);
                return in_array($this->answerType, $this->answerTypes);
            }
        }
        return false;
    }

    protected function checkAnswers() 
    {
        $inAnswers = false;
        while (true) {
            $ln = $this->contentArr[$this->currentLineNumber++];
            if (!empty($ln)) {
                $inAnswers = true;
                $isCorr = 0;
                $a = explode(',', $ln);
                if (count($a) > 1) {
                    $isCorr = trim(array_pop($a));
                    OmniHelper::log('isCorr' . $isCorr);
                    if (!in_array($isCorr, [1,0,"1", "0"])) {
                        $this->message = "La respuesta tiene una coma y en ese caso tiene que terminar con ,0 o con ,1";
                        return false;
                    }
                }
                $ansTxt = trim(implode(',', $a));
                if ($isCorr == 1) {
                    $this->correctAnswers[] = $ansTxt;
                }
                $this->answers[] = $ansTxt;
            } else {
                if ($inAnswers) {
                    break;
                }
            }
        }
        switch ($this->answerType) {
            case  's':
            case  'm':
                if (count($this->answers) > 1) {
                    return  $this->checkCorrectAnswers();
                }
                $this->message = "Se requiere a lo menos dos respuestas";
                return false;
            case  'o':
                if (count($this->answers) >= 1) {
                    return  $this->checkCorrectAnswers();
                }
                $this->message = "Se requiere a lo menos una respuesta";
                return false;
            case  'n':
                if (count($this->answers) === 1) {
                    return  $this->checkCorrectAnswers();
                }
                $this->message = "Opción numerica requiere exáctamente una respuesta";
                return false;
            case  's':
            default:
                return  $this->checkCorrectAnswers();
        }
        return false;
    }

    protected function checkHints() 
    {
        $inHints = false;
        while ($this->currentLineNumber < count($this->contentArr)) {
            $ln = $this->contentArr[$this->currentLineNumber++];
            if (!empty($ln)) {
                $inHints = true;
                $this->hints[] = $ln;
            } else {
                if ($inHints) {
                    break;
                }
            }
        }
    }

    protected function checkCorrectAnswers()
    {
        OmniHelper::log($this->correctAnswers);
        switch ($this->answerType) {
            case  's':
                if (count($this->correctAnswers) === 1) {
                    return  true;
                }
                $this->message = "Favor de indicar una respuesta correcta";
                return false;
            case  'm':
                if (count($this->correctAnswers) >= 1) {
                    return  true;
                }
                $this->message = "Favor de indicar a lo menos una respuesta correcta";
                return false;
            case  'n':
            case  'o':
            default:
                return true;
        }

        return false;
    }
}
