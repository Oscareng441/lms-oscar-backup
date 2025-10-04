<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Helpers\OmniHelper;
use App\Helpers\UploadHelper;

class ProblemUploadRule implements ValidationRule
{
    protected $msg = '';
    protected $currentLineNumber = 0;
    protected $valuesArr = 0;

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $h = new UploadHelper($value);
        if (! $h->check()) {
            $fail($h->getMessage());
        }
    }
}
