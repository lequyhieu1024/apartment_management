<?php

namespace App\Repositories;

use App\Models\Unit;

class UnitRepository extends BaseRepository {
    public function getModel()
    {
        return Unit::class;
    }
}
