<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Models\Problem;

class ProblemDeleteValidationRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // $problem = Problem::find($this->request->)
        // if (!$problem->okToDelete()) {
        //     $fail("");
        // }
        \App\Helpers\OmniHelper::log($attribute);
        \App\Helpers\OmniHelper::log($value);
        \App\Helpers\OmniHelper::log($this->request);
        $fail("no way man");
    }
}
